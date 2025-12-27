'use client';

import React, { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import AddProjectDialog from './AddProjectDialog';

// Types
interface Company {
  companyName?: string;
  address?: string;
  state?: string;
  email?: string;
  phone?: string;
  website?: string;
  type?: string;
  description?: string;
  tags?: string[];
  priority?: string;
  createdAt?: string;
  updatedAt?: string;
  assignee?: {
    initials: string;
    name: string;
  };
  contact?: {
    name: string;
    role: string;
    phone: string;
    email: string;
    address: string;
    firstContact: string;
    description: string;
  };
  projects?: Array<{
    id: string;
    name: string;
    state: string;
    totalAmount: string;
    startDate: string;
    endDate: string;
  }>;
}

interface CompanyDetailsProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
  updateCompanyState?: (companyId: number, newState: 'Active' | 'Not Active' | 'Pending') => void;
}

interface AvatarProps {
  initials: string;
  color?: string;
  size?: number;
  showStatus?: boolean;
}

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  hasClose?: boolean;
  hasArrow?: boolean;
  textColor?: string;
  onClose?: () => void;
}

interface FieldRowProps {
  icon: React.ReactNode;
  label: string;
  children?: React.ReactNode;
}

// SVG Icons as components
const Icons = {
  Chart: (): JSX.Element => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1.17 10.5V5.25H3.5V10.5H1.17ZM5.83 10.5V3.5H8.17V10.5H5.83ZM10.5 10.5V7H12.83V10.5H10.5Z" fill="#999999"/>
    </svg>
  ),
  Essential: (): JSX.Element => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M7.0747 1.17908C3.82038 1.17908 1.1792 3.82026 1.1792 7.07458C1.1792 10.3289 3.82038 12.9701 7.0747 12.9701C10.329 12.9701 12.9702 10.3289 12.9702 7.07458C12.9702 3.82026 10.329 1.17908 7.0747 1.17908ZM7.0747 5.15854C6.83298 5.15854 6.63254 4.95809 6.63254 4.71638C6.63254 4.47466 6.83298 4.27421 7.0747 4.27421C8.61932 4.27421 9.87506 5.52996 9.87506 7.07458C9.87506 8.6192 8.61932 9.87494 7.0747 9.87494C6.83298 9.87494 6.63254 9.67449 6.63254 9.43278C6.63254 9.19106 6.83298 8.99061 7.0747 8.99061C8.12999 8.99061 8.99074 8.12987 8.99074 7.07458C8.99074 6.01928 8.12999 5.15854 7.0747 5.15854ZM7.0747 11.6436C4.55732 11.6436 2.50569 9.59196 2.50569 7.07458C2.50569 6.83286 2.70613 6.63241 2.94785 6.63241C3.18956 6.63241 3.39001 6.83286 3.39001 7.07458C3.39001 9.10852 5.04075 10.7593 7.0747 10.7593C9.10865 10.7593 10.7594 9.10852 10.7594 7.07458C10.7594 5.04063 9.10865 3.38989 7.0747 3.38989C6.83298 3.38989 6.63254 3.18944 6.63254 2.94773C6.63254 2.70601 6.83298 2.50556 7.0747 2.50556C9.59208 2.50556 11.6437 4.5572 11.6437 7.07458C11.6437 9.59196 9.59208 11.6436 7.0747 11.6436Z" fill="#999999"/>
    </svg>
  ),
  Tag: (): JSX.Element => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M10.6942 4.69191L8.25118 2.2489C7.73885 1.73657 7.03237 1.46153 6.30972 1.49928L3.61325 1.62871C2.53466 1.67725 1.67718 2.53473 1.62325 3.60792L1.49382 6.3044C1.46146 7.02705 1.73111 7.73353 2.24344 8.24586L4.68644 10.6889C5.68953 11.6919 7.3182 11.6919 8.32668 10.6889L10.6942 8.32136C11.7027 7.32366 11.7027 5.69499 10.6942 4.69191ZM5.12327 6.67651C4.26579 6.67651 3.5701 5.98082 3.5701 5.12334C3.5701 4.26586 4.26579 3.57017 5.12327 3.57017C5.98075 3.57017 6.67644 4.26586 6.67644 5.12334C6.67644 5.98082 5.98075 6.67651 5.12327 6.67651Z" fill="#999999"/>
    </svg>
  ),
  Flag: (): JSX.Element => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M9.10596 6.23066L8.48946 5.61416C8.34292 5.48783 8.25701 5.30086 8.25196 5.09367C8.24185 4.86628 8.33281 4.63888 8.49957 4.47212L9.10596 3.86573C9.63151 3.34018 9.82858 2.83486 9.66183 2.43565C9.50012 2.04149 8.99985 1.8242 8.26207 1.8242H2.98138V1.38962C2.98138 1.18243 2.80957 1.01062 2.60239 1.01062C2.3952 1.01062 2.22339 1.18243 2.22339 1.38962V10.7382C2.22339 10.9454 2.3952 11.1172 2.60239 11.1172C2.80957 11.1172 2.98138 10.9454 2.98138 10.7382V8.27219H8.26207C8.98974 8.27219 9.47991 8.04985 9.64667 7.65064C9.81342 7.25143 9.6214 6.75115 9.10596 6.23066Z" fill="#999999"/>
    </svg>
  ),
  FlagWhite: (): JSX.Element => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M9.10596 6.23066L8.48946 5.61416C8.34292 5.48783 8.25701 5.30086 8.25196 5.09367C8.24185 4.86628 8.33281 4.63888 8.49957 4.47212L9.10596 3.86573C9.63151 3.34018 9.82858 2.83486 9.66183 2.43565C9.50012 2.04149 8.99985 1.8242 8.26207 1.8242H2.98138V1.38962C2.98138 1.18243 2.80957 1.01062 2.60239 1.01062C2.3952 1.01062 2.22339 1.18243 2.22339 1.38962V10.7382C2.22339 10.9454 2.3952 11.1172 2.60239 11.1172C2.80957 11.1172 2.98138 10.9454 2.98138 10.7382V8.27219H8.26207C8.98974 8.27219 9.47991 8.04985 9.64667 7.65064C9.81342 7.25143 9.6214 6.75115 9.10596 6.23066Z" fill="#FFFFFF"/>
    </svg>
  ),
  Call: (): JSX.Element => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M6.51463 8.81375L5.42396 9.90442C5.19403 10.1343 4.82851 10.1343 4.59269 9.91031C4.52784 9.84546 4.46299 9.78651 4.39814 9.72166C3.79091 9.10852 3.24262 8.46592 2.7533 7.79383C2.26987 7.12174 1.88076 6.44965 1.59778 5.78346C1.32069 5.11138 1.1792 4.46877 1.1792 3.85563C1.1792 3.45474 1.24995 3.07153 1.39144 2.7178C1.53293 2.35818 1.75696 2.02803 2.06942 1.73325C2.44673 1.36184 2.85942 1.17908 3.29568 1.17908C3.46076 1.17908 3.62583 1.21445 3.77322 1.2852C3.9265 1.35594 4.0621 1.46206 4.16822 1.61534L5.53597 3.54317C5.64209 3.69056 5.71873 3.82616 5.77179 3.95586C5.82485 4.07966 5.85433 4.20347 5.85433 4.31548C5.85433 4.45698 5.81306 4.59847 5.73053 4.73406C5.65388 4.86966 5.54187 5.01115 5.40038 5.15264L4.95232 5.61839C4.88747 5.68324 4.85799 5.75988 4.85799 5.85421C4.85799 5.90137 4.86389 5.94264 4.87568 5.98981C4.89336 6.03697 4.91105 6.07234 4.92284 6.10772C5.02896 6.30227 5.21172 6.55577 5.47112 6.86234C5.73642 7.16891 6.0194 7.48137 6.32597 7.79383C6.38493 7.85278 6.44978 7.91174 6.50873 7.97069C6.74455 8.20062 6.75045 8.57793 6.51463 8.81375Z" fill="#999999"/>
      <path d="M12.9524 10.8064C12.9524 10.9715 12.9229 11.1424 12.864 11.3075C12.8463 11.3547 12.8286 11.4018 12.805 11.449C12.7048 11.6612 12.5751 11.8617 12.4041 12.0503C12.1152 12.3687 11.7969 12.5986 11.4373 12.746C11.4314 12.746 11.4255 12.7519 11.4196 12.7519C11.0717 12.8934 10.6944 12.97 10.2876 12.97C9.6863 12.97 9.04368 12.8285 8.3657 12.5397C7.68772 12.2508 7.00974 11.8617 6.33765 11.3724C6.10773 11.2014 5.8778 11.0304 5.65967 10.8477L7.5875 8.91983C7.75257 9.04364 7.89996 9.13796 8.02376 9.20282C8.05324 9.21461 8.08861 9.23229 8.12988 9.24998C8.17705 9.26767 8.22421 9.27356 8.27727 9.27356C8.37749 9.27356 8.45413 9.23819 8.51899 9.17334L8.96704 8.73118C9.11443 8.58379 9.25592 8.47177 9.39152 8.40103C9.52712 8.31849 9.66271 8.27722 9.8101 8.27722C9.92211 8.27722 10.04 8.3008 10.1697 8.35386C10.2994 8.40692 10.435 8.48356 10.5824 8.58379L12.5338 9.96923C12.6871 10.0753 12.7932 10.1992 12.8581 10.3465C12.917 10.4939 12.9524 10.6413 12.9524 10.8064Z" fill="#999999"/>
    </svg>
  ),
  Email: (): JSX.Element => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M10.0224 2.06348H4.12695C2.3583 2.06348 1.1792 2.9478 1.1792 5.01123V9.13808C1.1792 11.2015 2.3583 12.0858 4.12695 12.0858H10.0224C11.7911 12.0858 12.9702 11.2015 12.9702 9.13808V5.01123C12.9702 2.9478 11.7911 2.06348 10.0224 2.06348ZM10.2995 5.65384L8.45425 7.12771C8.06514 7.44017 7.56992 7.59346 7.0747 7.59346C6.57948 7.59346 6.07836 7.44017 5.69515 7.12771L3.84986 5.65384C3.6612 5.50055 3.63173 5.21757 3.77911 5.02891C3.9324 4.84026 4.20949 4.80488 4.39814 4.95817L6.24343 6.43204C6.69149 6.79167 7.45201 6.79167 7.90007 6.43204L9.74536 4.95817C9.93402 4.80488 10.217 4.83436 10.3644 5.02891C10.5177 5.21757 10.4882 5.50055 10.2995 5.65384Z" fill="#999999"/>
    </svg>
  ),
  Users: (): JSX.Element => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M4.85364 1.07861C3.44069 1.07861 2.29199 2.22731 2.29199 3.64026C2.29199 5.02625 3.37597 6.14798 4.78893 6.19652C4.83207 6.19112 4.87521 6.19112 4.90757 6.19652C4.91836 6.19652 4.92375 6.19652 4.93453 6.19652C4.93993 6.19652 4.93993 6.19652 4.94532 6.19652C6.32591 6.14798 7.4099 5.02625 7.41529 3.64026C7.41529 2.22731 6.26659 1.07861 4.85364 1.07861Z" fill="#999999"/>
      <path d="M7.59338 7.63098C6.08875 6.62789 3.63496 6.62789 2.11954 7.63098C1.43464 8.08938 1.05713 8.70957 1.05713 9.3729C1.05713 10.0362 1.43464 10.651 2.11415 11.104C2.86916 11.611 3.86146 11.8644 4.85376 11.8644C5.84606 11.8644 6.83837 11.611 7.59338 11.104C8.27289 10.6456 8.65039 10.0308 8.65039 9.36211C8.645 8.69878 8.27289 8.08399 7.59338 7.63098Z" fill="#999999"/>
      <path d="M10.7804 3.95837C10.8667 5.0046 10.1225 5.9214 9.09244 6.04544C9.08704 6.04544 9.08704 6.04544 9.08165 6.04544H9.06547C9.03311 6.04544 9.00075 6.04544 8.97379 6.05623C8.45067 6.08319 7.9707 5.91601 7.60938 5.60861C8.16485 5.11246 8.48303 4.36824 8.41832 3.5593C8.38057 3.12247 8.22956 2.72339 8.00306 2.38363C8.20799 2.28117 8.44528 2.21645 8.68796 2.19488C9.74498 2.1032 10.6887 2.89057 10.7804 3.95837Z" fill="#999999"/>
      <path d="M11.859 8.94689C11.8159 9.47001 11.4815 9.92302 10.9207 10.2304C10.3814 10.527 9.70186 10.6672 9.02774 10.6511C9.41603 10.3005 9.64253 9.8637 9.68568 9.3999C9.73961 8.73118 9.42142 8.08942 8.78506 7.57709C8.42373 7.29126 8.00308 7.06476 7.54468 6.89758C8.73652 6.55243 10.2358 6.78432 11.158 7.52855C11.6541 7.92763 11.9076 8.42917 11.859 8.94689Z" fill="#999999"/>
    </svg>
  ),
  Location: (): JSX.Element => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scale(0.5)', transformOrigin: 'top left' }}>
      <rect width="24" height="24" rx="8" fill="#222222"/>
      <path d="M14.1675 5.5875H9.83248C9.53248 5.5875 9.29248 5.3475 9.29248 5.0475C9.29248 4.7475 9.53248 4.5 9.83248 4.5H14.1675C14.4675 4.5 14.7075 4.74 14.7075 5.04C14.7075 5.34 14.4675 5.5875 14.1675 5.5875Z" fill="#999999"/>
      <path d="M13.5001 17.9775V15.7725C13.5001 14.415 14.4151 13.5 15.7726 13.5H17.9776C18.1501 13.5 18.3151 13.515 18.4726 13.545C18.4876 13.365 18.5026 13.185 18.5026 12.9975C18.5026 9.40505 15.5851 6.48755 12.0001 6.48755C8.41506 6.48755 5.49756 9.40505 5.49756 12.9975C5.49756 16.5825 8.41506 19.5 12.0001 19.5C12.6376 19.5 13.2451 19.395 13.8301 19.23C13.6201 18.8775 13.5001 18.4575 13.5001 17.9775ZM12.5626 12.75C12.5626 13.0575 12.3076 13.3125 12.0001 13.3125C11.6926 13.3125 11.4376 13.0575 11.4376 12.75V9.00005C11.4376 8.69255 11.6926 8.43755 12.0001 8.43755C12.3076 8.43755 12.5626 8.69255 12.5626 9.00005V12.75Z" fill="#999999"/>
      <path d="M17.9775 14.25H15.78C14.82 14.25 14.25 14.82 14.25 15.7725V17.9775C14.25 18.93 14.82 19.5 15.78 19.5H17.9775C18.93 19.5 19.5 18.93 19.5 17.9775V15.7725C19.5 14.82 18.93 14.25 17.9775 14.25ZM16.44 18.045C16.44 18.285 16.245 18.48 15.9975 18.48C15.7575 18.48 15.5625 18.285 15.5625 18.045V15.705C15.5625 15.465 15.7575 15.27 15.9975 15.27C16.245 15.27 16.44 15.465 16.44 15.705V18.045ZM18.1875 18.045C18.1875 18.285 17.9925 18.48 17.7525 18.48C17.5125 18.48 17.31 18.285 17.31 18.045V15.705C17.31 15.465 17.5125 15.27 17.7525 15.27C17.9925 15.27 18.1875 15.465 18.1875 15.705V18.045Z" fill="#999999"/>
    </svg>
  ),
  ArrowDown: (): JSX.Element => (
    <img src="/icon compan/Arrow.svg" alt="" width="10" height="10" />
  ),
  ArrowDownGray: (): JSX.Element => (
    <img src="/icon compan/Arrow.svg" alt="" width="12" height="12" style={{ transform: 'rotate(90deg)' }} />
  ),
  Messages: (): JSX.Element => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M12.97 7.58157C12.97 8.93164 12.2743 10.1284 11.2013 10.883L10.4113 12.6222C10.2286 13.0172 9.69798 13.0939 9.42089 12.7578L8.54835 11.7084C7.45179 11.7084 6.44366 11.337 5.67725 10.718L6.03098 10.2994C8.7547 10.0931 10.9066 7.9353 10.9066 5.30591C10.9066 4.85785 10.8417 4.41569 10.7238 3.99121C12.0621 4.69867 12.97 6.04284 12.97 7.58157Z" fill="#999999"/>
      <path d="M9.60976 3.57855C8.91999 2.16363 7.38127 1.17908 5.60082 1.17908C3.16009 1.17908 1.1792 3.02437 1.1792 5.30593C1.1792 6.656 1.87487 7.85278 2.94785 8.60741L3.73785 10.3466C3.92061 10.7416 4.4512 10.8123 4.72829 10.4822L5.05254 10.0931L5.60082 9.43278C8.04156 9.43278 10.0224 7.58749 10.0224 5.30593C10.0224 4.6869 9.87506 4.10325 9.60976 3.57855ZM7.0747 5.74809H4.12695C3.88523 5.74809 3.68479 5.54764 3.68479 5.30593C3.68479 5.06421 3.88523 4.86376 4.12695 4.86376H7.0747C7.31641 4.86376 7.51686 5.06421 7.51686 5.30593C7.51686 5.54764 7.31641 5.74809 7.0747 5.74809Z" fill="#999999"/>
    </svg>
  ),
  Building: (): JSX.Element => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M5.65519 2.21501C5.65519 2.31639 5.56981 2.40177 5.46843 2.40177H4.86545C3.71286 2.40177 2.77371 3.34092 2.77371 4.49351V9.41871C2.77371 9.52009 2.68833 9.60547 2.58694 9.60547H2.21342C1.57843 9.60547 1.06616 9.09321 1.06616 8.45822V2.21501C1.06616 1.58001 1.57843 1.06775 2.21342 1.06775H4.50793C5.14293 1.06775 5.65519 1.58001 5.65519 2.21501Z" fill="#999999"/>
      <path d="M11.7397 2.21501V8.45822C11.7397 9.09321 11.2274 9.60547 10.5924 9.60547H10.2562C10.1548 9.60547 10.0695 9.52009 10.0695 9.41871V4.49351C10.0695 3.34092 9.13032 2.40177 7.97773 2.40177H7.3374C7.23601 2.40177 7.15063 2.31639 7.15063 2.21501C7.15063 1.58001 7.6629 1.06775 8.29789 1.06775H10.5924C11.2274 1.06775 11.7397 1.58001 11.7397 2.21501Z" fill="#999999"/>
      <path d="M7.97599 3.20166H4.86506C4.15003 3.20166 3.57373 3.77796 3.57373 4.49299V10.4481C3.57373 11.1631 4.15003 11.7394 4.86506 11.7394H5.73484C5.88425 11.7394 6.00165 11.622 6.00165 11.4726V10.1386C6.00165 9.91978 6.18307 9.73835 6.40185 9.73835C6.62063 9.73835 6.80206 9.91978 6.80206 10.1386V11.4726C6.80206 11.622 6.91945 11.7394 7.06886 11.7394H7.98133C8.69103 11.7394 9.26732 11.1631 9.26732 10.4534V4.49299C9.26732 3.77796 8.69103 3.20166 7.97599 3.20166ZM7.46907 7.87073H5.33464C5.11586 7.87073 4.93443 7.6893 4.93443 7.47052C4.93443 7.25174 5.11586 7.07032 5.33464 7.07032H7.46907C7.68785 7.07032 7.86927 7.25174 7.86927 7.47052C7.86927 7.6893 7.68785 7.87073 7.46907 7.87073ZM7.46907 6.2699H5.33464C5.11586 6.2699 4.93443 6.08848 4.93443 5.8697C4.93443 5.65092 5.11586 5.46949 5.33464 5.46949H7.46907C7.68785 5.46949 7.86927 5.65092 7.86927 5.8697C7.86927 6.08848 7.68785 6.2699 7.46907 6.2699Z" fill="#999999"/>
    </svg>
  ),
  Link: (): JSX.Element => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M6.40322 1.06726C3.4577 1.06726 1.06714 3.45782 1.06714 6.40334C1.06714 9.34885 3.4577 11.7394 6.40322 11.7394C9.34873 11.7394 11.7393 9.34885 11.7393 6.40334C11.7393 3.45782 9.34873 1.06726 6.40322 1.06726ZM4.61563 7.88143C4.55693 8.04151 4.40219 8.1429 4.2421 8.1429C4.19408 8.1429 4.15139 8.13756 4.10337 8.11622C3.67114 7.95614 3.30829 7.64131 3.07884 7.23043C2.54523 6.26994 2.87607 5.01596 3.80988 4.43433L5.05852 3.66059C5.51743 3.37778 6.05637 3.2924 6.56863 3.42581C7.0809 3.55921 7.51312 3.89538 7.77459 4.36496C8.30819 5.32545 7.97736 6.57943 7.04354 7.16106L6.90481 7.26245C6.72338 7.39051 6.47258 7.34782 6.34452 7.17173C6.21645 6.99031 6.25914 6.73951 6.43523 6.61144L6.60065 6.49405C7.19829 6.12053 7.40106 5.34679 7.07556 4.75449C6.92081 4.47701 6.67002 4.27958 6.3712 4.19954C6.07238 4.1195 5.75755 4.16752 5.48541 4.33828L4.2261 5.11734C3.6498 5.47486 3.44703 6.24859 3.77253 6.84623C3.90593 7.08636 4.11937 7.27312 4.37551 7.36917C4.58361 7.44387 4.69033 7.67332 4.61563 7.88143ZM9.02856 8.35101L7.77992 9.12474C7.46509 9.32217 7.11291 9.41822 6.7554 9.41822C6.59531 9.41822 6.4299 9.39688 6.26981 9.35419C5.75755 9.22079 5.32533 8.88461 5.0692 8.41504C4.53559 7.45454 4.86643 6.20057 5.80024 5.61893L5.93898 5.51755C6.1204 5.38948 6.3712 5.43217 6.49926 5.60826C6.62733 5.78969 6.58464 6.04048 6.40855 6.16855L6.24313 6.28594C5.64549 6.65947 5.44272 7.4332 5.76822 8.0255C5.92297 8.30298 6.17376 8.50042 6.47258 8.58046C6.7714 8.6605 7.08623 8.61247 7.35837 8.44172L8.60701 7.66799C9.18331 7.31047 9.38608 6.53674 9.06058 5.9391C8.92718 5.69898 8.71374 5.51221 8.4576 5.41616C8.2495 5.34146 8.14278 5.11201 8.22282 4.9039C8.29752 4.69579 8.53231 4.58907 8.73508 4.66911C9.1673 4.82919 9.53016 5.14402 9.75961 5.5549C10.2879 6.51539 9.96238 7.76937 9.02856 8.35101Z" fill="#999999"/>
    </svg>
  ),
  Calendar: (): JSX.Element => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M4.4024 3.06872C4.18362 3.06872 4.0022 2.88729 4.0022 2.66851V1.06769C4.0022 0.848907 4.18362 0.66748 4.4024 0.66748C4.62118 0.66748 4.80261 0.848907 4.80261 1.06769V2.66851C4.80261 2.88729 4.62118 3.06872 4.4024 3.06872Z" fill="#999999"/>
      <path d="M8.40436 3.06872C8.18558 3.06872 8.00415 2.88729 8.00415 2.66851V1.06769C8.00415 0.848907 8.18558 0.66748 8.40436 0.66748C8.62314 0.66748 8.80456 0.848907 8.80456 1.06769V2.66851C8.80456 2.88729 8.62314 3.06872 8.40436 3.06872Z" fill="#999999"/>
      <path d="M6.40212 7.51897C6.6796 7.51897 6.88237 7.35355 6.88237 7.09208C6.88237 6.82528 6.6796 6.67053 6.40212 6.67053C6.12465 6.67053 5.92188 6.82528 5.92188 7.09208C5.92188 7.35355 6.12465 7.51897 6.40212 7.51897Z" fill="#999999"/>
      <path d="M6.40201 9.07161C6.73798 9.07161 7.01033 8.84943 7.01033 8.57536C7.01033 8.30128 6.73798 8.0791 6.40201 8.0791C6.06605 8.0791 5.7937 8.30128 5.7937 8.57536C5.7937 8.84943 6.06605 9.07161 6.40201 9.07161Z" fill="#999999"/>
      <path d="M10.4439 2.40165C10.0917 2.14018 9.58478 2.39098 9.58478 2.83387V2.88723C9.58478 3.51155 9.13655 4.08785 8.51223 4.15188C7.79186 4.22659 7.18355 3.66096 7.18355 2.9566V2.40165C7.18355 2.10817 6.94342 1.86804 6.64994 1.86804H6.15902C5.86553 1.86804 5.62541 2.10817 5.62541 2.40165V2.9566C5.62541 3.37815 5.40663 3.75168 5.07579 3.95978C5.02777 3.9918 4.97441 4.01848 4.92105 4.04516C4.87302 4.07184 4.81966 4.09319 4.76097 4.10919C4.69693 4.13054 4.62756 4.14655 4.55286 4.15188C4.46748 4.16255 4.3821 4.16255 4.29673 4.15188C4.22202 4.14655 4.15265 4.13054 4.08862 4.10919C4.03526 4.09319 3.9819 4.07184 3.92854 4.04516C3.87518 4.01848 3.82182 3.9918 3.77379 3.95978C3.43762 3.725 3.22418 3.31945 3.22418 2.88723V2.83387C3.22418 2.42299 2.78662 2.17753 2.43977 2.35362C2.43444 2.35896 2.4291 2.35896 2.42376 2.3643C2.40242 2.37497 2.38641 2.38564 2.36507 2.40165C2.34906 2.41766 2.32772 2.42833 2.31171 2.44434C2.1623 2.56173 2.02889 2.69513 1.91684 2.83921C1.85814 2.90324 1.81012 2.97261 1.76743 3.04198C1.76209 3.04731 1.75676 3.05265 1.75142 3.06332C1.70339 3.13269 1.66071 3.21273 1.62335 3.28744C1.61268 3.29811 1.60734 3.30345 1.60734 3.31412C1.57533 3.37815 1.54331 3.44218 1.52197 3.51155C1.50596 3.53823 1.50062 3.55958 1.48995 3.58626C1.45793 3.6663 1.43659 3.74634 1.41525 3.82638C1.3939 3.90109 1.37789 3.98113 1.36722 4.06117C1.35655 4.11987 1.35121 4.17856 1.34588 4.2426C1.34054 4.3173 1.33521 4.39201 1.33521 4.46671V9.14111C1.33521 10.5765 2.49847 11.7398 3.93387 11.7398H8.87508C10.3105 11.7398 11.4738 10.5765 11.4738 9.14111V4.46671C11.4738 3.61828 11.0682 2.87656 10.4439 2.40165ZM6.40448 9.73876C5.57739 9.73876 5.07046 9.32788 5.07046 8.6662C5.07046 8.30335 5.25722 7.98852 5.58272 7.80176C5.34793 7.63634 5.19319 7.39088 5.19319 7.05471C5.19319 6.36102 5.74814 6.0035 6.40448 6.0035C7.06082 6.0035 7.61043 6.36102 7.61043 7.05471C7.61043 7.39088 7.46102 7.63634 7.2209 7.80176C7.55173 7.98852 7.7385 8.30335 7.7385 8.6662C7.7385 9.32788 7.22623 9.73876 6.40448 9.73876Z" fill="#999999"/>
    </svg>
  ),
  Time: (): JSX.Element => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M8.93797 1.89963V1.0672C8.93797 0.848419 8.75654 0.666992 8.53776 0.666992C8.31898 0.666992 8.13755 0.848419 8.13755 1.0672V1.86761H4.6691V1.0672C4.6691 0.848419 4.48768 0.666992 4.2689 0.666992C4.05012 0.666992 3.86869 0.848419 3.86869 1.0672V1.89963C2.42795 2.03303 1.72893 2.89214 1.6222 4.16746C1.61153 4.3222 1.7396 4.45027 1.88901 4.45027H10.9176C11.0724 4.45027 11.2005 4.31687 11.1845 4.16746C11.0777 2.89214 10.3787 2.03303 8.93797 1.89963Z" fill="#999999"/>
      <path d="M10.6722 5.25073H2.13444C1.84095 5.25073 1.60083 5.49086 1.60083 5.78434V9.07136C1.60083 10.6722 2.40124 11.7394 4.26887 11.7394H8.53773C10.4054 11.7394 11.2058 10.6722 11.2058 9.07136V5.78434C11.2058 5.49086 10.9656 5.25073 10.6722 5.25073ZM7.91875 7.99881L7.65194 8.27095H7.64661L6.02977 9.88778C5.96041 9.95715 5.81633 10.0319 5.71495 10.0425L4.99458 10.1493C4.73311 10.1866 4.55168 9.99984 4.58903 9.74371L4.69042 9.018C4.70643 8.91662 4.7758 8.77788 4.84517 8.70317L6.46733 7.08634L6.73414 6.8142C6.91023 6.63811 7.10766 6.51005 7.32111 6.51005C7.50253 6.51005 7.69997 6.59542 7.91875 6.8142C8.39899 7.29445 8.24425 7.67331 7.91875 7.99881Z" fill="#999999"/>
    </svg>
  ),
  Home: (): JSX.Element => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M11.6901 3.97832L8.33006 1.62748C7.41422 0.985817 6.00839 1.02082 5.12756 1.70332L2.20506 3.98415C1.62172 4.43915 1.16089 5.37248 1.16089 6.10748V10.1325C1.16089 11.62 2.36839 12.8333 3.85589 12.8333H10.1442C11.6317 12.8333 12.8392 11.6258 12.8392 10.1383V6.18332C12.8392 5.39582 12.3317 4.42748 11.6901 3.97832ZM7.43756 10.5C7.43756 10.7392 7.23922 10.9375 7.00006 10.9375C6.76089 10.9375 6.56256 10.7392 6.56256 10.5V8.74998C6.56256 8.51082 6.76089 8.31248 7.00006 8.31248C7.23922 8.31248 7.43756 8.51082 7.43756 8.74998V10.5Z" fill="#999999"/>
    </svg>
  ),
  Maximize: (): JSX.Element => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3.75 6.75V3.75H6.75M11.25 3.75H14.25V6.75M14.25 11.25V14.25H11.25M6.75 14.25H3.75V11.25" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Timer: (): JSX.Element => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 1.5V3M9 3C5.68629 3 3 5.68629 3 9C3 12.3137 5.68629 15 9 15C12.3137 15 15 12.3137 15 9C15 5.68629 12.3137 3 9 3ZM9 6V9L11.25 11.25" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Frame228: (): JSX.Element => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15.1425 4.5H8.8575C6.1275 4.5 4.5 6.1275 4.5 8.8575V15.135C4.5 17.8725 6.1275 19.5 8.8575 19.5H15.135C17.865 19.5 19.4925 17.8725 19.4925 15.1425V8.8575C19.5 6.1275 17.8725 4.5 15.1425 4.5ZM11.6475 13.1475L8.8575 15.9375H10.5C10.8075 15.9375 11.0625 16.1925 11.0625 16.5C11.0625 16.8075 10.8075 17.0625 10.5 17.0625H7.5C7.425 17.0625 7.35 17.0475 7.2825 17.0175C7.1475 16.9575 7.035 16.8525 6.975 16.71C6.9525 16.6425 6.9375 16.575 6.9375 16.5V13.5C6.9375 13.1925 7.1925 12.9375 7.5 12.9375C7.8075 12.9375 8.0625 13.1925 8.0625 13.5V15.1425L10.8525 12.3525C11.07 12.135 11.43 12.135 11.6475 12.3525C11.865 12.57 11.865 12.93 11.6475 13.1475ZM17.0625 10.5C17.0625 10.8075 16.8075 11.0625 16.5 11.0625C16.1925 11.0625 15.9375 10.8075 15.9375 10.5V8.8575L13.1475 11.6475C13.035 11.76 12.8925 11.8125 12.75 11.8125C12.6075 11.8125 12.465 11.76 12.3525 11.6475C12.135 11.43 12.135 11.07 12.3525 10.8525L15.1425 8.0625H13.5C13.1925 8.0625 12.9375 7.8075 12.9375 7.5C12.9375 7.1925 13.1925 6.9375 13.5 6.9375H16.5C16.575 6.9375 16.6425 6.9525 16.7175 6.9825C16.8525 7.0425 16.965 7.1475 17.025 7.29C17.0475 7.3575 17.0625 7.425 17.0625 7.5V10.5Z" fill="#999999"/>
    </svg>
  ),
  Frame409: (): JSX.Element => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M14.1675 5.5875H9.83248C9.53248 5.5875 9.29248 5.3475 9.29248 5.0475C9.29248 4.7475 9.53248 4.5 9.83248 4.5H14.1675C14.4675 4.5 14.7075 4.74 14.7075 5.04C14.7075 5.34 14.4675 5.5875 14.1675 5.5875Z" fill="#999999"/>
      <path d="M13.5001 17.9775V15.7725C13.5001 14.415 14.4151 13.5 15.7726 13.5H17.9776C18.1501 13.5 18.3151 13.515 18.4726 13.545C18.4876 13.365 18.5026 13.185 18.5026 12.9975C18.5026 9.40505 15.5851 6.48755 12.0001 6.48755C8.41506 6.48755 5.49756 9.40505 5.49756 12.9975C5.49756 16.5825 8.41506 19.5 12.0001 19.5C12.6376 19.5 13.2451 19.395 13.8301 19.23C13.6201 18.8775 13.5001 18.4575 13.5001 17.9775ZM12.5626 12.75C12.5626 13.0575 12.3076 13.3125 12.0001 13.3125C11.6926 13.3125 11.4376 13.0575 11.4376 12.75V9.00005C11.4376 8.69255 11.6926 8.43755 12.0001 8.43755C12.3076 8.43755 12.5626 8.69255 12.5626 9.00005V12.75Z" fill="#999999"/>
      <path d="M17.9775 14.25H15.78C14.82 14.25 14.25 14.82 14.25 15.7725V17.9775C14.25 18.93 14.82 19.5 15.78 19.5H17.9775C18.93 19.5 19.5 18.93 19.5 17.9775V15.7725C19.5 14.82 18.93 14.25 17.9775 14.25ZM16.44 18.045C16.44 18.285 16.245 18.48 15.9975 18.48C15.7575 18.48 15.5625 18.285 15.5625 18.045V15.705C15.5625 15.465 15.7575 15.27 15.9975 15.27C16.245 15.27 16.44 15.465 16.44 15.705V18.045ZM18.1875 18.045C18.1875 18.285 17.9925 18.48 17.7525 18.48C17.5125 18.48 17.31 18.285 17.31 18.045V15.705C17.31 15.465 17.5125 15.27 17.7525 15.27C17.9925 15.27 18.1875 15.465 18.1875 15.705V18.045Z" fill="#999999"/>
    </svg>
  ),
  More: (): JSX.Element => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="2" r="1" fill="#999999"/>
      <circle cx="6" cy="6" r="1" fill="#999999"/>
      <circle cx="6" cy="10" r="1" fill="#999999"/>
    </svg>
  ),
  MoreHorizontal: (): JSX.Element => (
    <svg width="12" height="6" viewBox="0 0 12 6" fill="none">
      <circle cx="2" cy="3" r="1.5" fill="#3D3D3D"/>
      <circle cx="6" cy="3" r="1.5" fill="#3D3D3D"/>
      <circle cx="10" cy="3" r="1.5" fill="#3D3D3D"/>
    </svg>
  ),
  Close: (): JSX.Element => (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M7.5 2.5L2.5 7.5M2.5 2.5L7.5 7.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
};

// Avatar component
const Avatar: React.FC<AvatarProps> = ({ 
  initials, 
  color = '#5842C8', 
  size = 20, 
  showStatus = false 
}) => (
  <div className="relative" style={{ width: size, height: size }}>
    <div
      className="flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: color,
        fontSize: size * 0.5,
        fontWeight: 510,
        color: '#FFFFFF',
        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {initials}
    </div>
    {showStatus && (
      <div
        className="absolute"
        style={{
          width: 6,
          height: 6,
          right: -1,
          bottom: -1,
          background: '#36BA7A',
          border: '1px solid #141414',
          borderRadius: '50%',
        }}
      />
    )}
  </div>
);

// Badge/Tag component
const Badge: React.FC<BadgeProps> = ({ 
  children, 
  color = '#5842C8', 
  hasClose = false, 
  hasArrow = false, 
  textColor = '#FFFFFF',
  onClose
}) => (
  <div
    className="inline-flex items-center gap-1"
    style={{
      background: color,
      borderRadius: 6,
      padding: '2px 6px',
      fontSize: 12,
      fontWeight: 510,
      color: textColor,
      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
      lineHeight: '16px',
      letterSpacing: '0.005em',
    }}
  >
    {children}
    {hasClose && (
      <span 
        className="cursor-pointer opacity-80 hover:opacity-100 ml-0.5"
        onClick={(e) => {
          e.stopPropagation();
          onClose?.();
        }}
      >
        <Icons.Close />
      </span>
    )}
    {hasArrow && (
      <>
        <div style={{ width: 1, height: 12, background: 'rgba(30, 30, 30, 0.5)', margin: '0 2px' }} />
        <Icons.ArrowDown />
      </>
    )}
  </div>
);

// Field Row component
const FieldRow: React.FC<FieldRowProps> = ({ icon, label, children }) => (
  <div className="flex items-center gap-0.5">
    <div className="flex items-center gap-0.5 min-w-[70px]">
      <div className="flex items-center justify-center w-6 h-6">{icon}</div>
      <span
        style={{
          fontSize: 12,
          fontWeight: 510,
          color: '#999999',
          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
          lineHeight: '16px',
          letterSpacing: '0.005em',
        }}
      >
        {label}
      </span>
    </div>
    {children && (
      <div className="flex items-center px-2 py-1 flex-1">{children}</div>
    )}
  </div>
);

// Divider component
const Divider: React.FC = () => (
  <div style={{ width: '100%', height: 1, background: '#2B2B2B', margin: '4px 0' }} />
);

// Sortable Project Row component
interface SortableProjectRowProps {
  project: {
    id: string;
    name: string;
    state: string;
    totalAmount: string;
    startDate: string;
    endDate: string;
  };
  index: number;
  totalProjects: number;
  onUpdateState?: (projectId: string, newState: string) => void;
}

const SortableProjectRow: React.FC<SortableProjectRowProps> = ({ project, index, totalProjects, onUpdateState }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });
  const [isStateMenuOpen, setIsStateMenuOpen] = useState(false);
  const [currentState, setCurrentState] = useState(project.state);

  useEffect(() => {
    setCurrentState(project.state);
  }, [project.state]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isStateMenuOpen && !target.closest(`[data-project-state-menu-${project.id}]`) && !target.closest(`[data-project-state-button-${project.id}]`)) {
        setIsStateMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isStateMenuOpen, project.id]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        borderBottom: index < totalProjects - 1 ? '1px solid #2B2B2B' : 'none',
      }}
      className="flex items-center hover:bg-[#1A1A1A] transition-colors"
    >
      <div className="flex flex-col items-start flex-shrink-0" style={{ width: '20px', zIndex: 0 }}>
        <div
          {...attributes}
          {...listeners}
          className="flex flex-row items-center justify-center flex-shrink-0"
          style={{
            width: '20px',
            height: '30px',
            padding: '12px 4px',
            gap: '0px',
            cursor: 'grab',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src="/more.png"
            alt="more"
            style={{
              width: '6px',
              height: '13px'
            }}
          />
        </div>
      </div>
      <div className="w-[126px] py-3 px-1">
        <div className="flex items-center gap-1">
          <img
            src="/Frame 312.png"
            alt="Project"
            className="w-4 h-4 rounded object-cover"
          />
          <span style={{ ...textStyle, color: '#999999' }}>{project.name}</span>
        </div>
      </div>
      <div className="w-[94px] py-3 px-1 flex justify-center relative">
        <button
          data-project-state-button={project.id}
          onClick={(e) => {
            e.stopPropagation();
            setIsStateMenuOpen(!isStateMenuOpen);
          }}
          className="cursor-pointer"
          type="button"
        >
          <Badge 
            color={
              currentState === 'Active' ? '#008E5A' : 
              currentState === 'Not Active' ? '#8E1F00' : 
              '#DC6300'
            } 
            hasArrow
          >
            {currentState}
          </Badge>
        </button>
        {isStateMenuOpen && onUpdateState && (
          <div
            data-project-state-menu={project.id}
            className="absolute top-full left-0 mt-1 z-50"
            style={{
              width: '120px',
              background: '#000000',
              border: '1px solid #2B2B2B',
              borderRadius: '8px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.4)',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentState('Active');
                onUpdateState(project.id, 'Active');
                setIsStateMenuOpen(false);
              }}
              className="w-full flex items-center px-3 py-2 hover:bg-[#2B2B2B] transition-colors"
              style={{
                gap: '8px',
                borderBottom: '1px solid #2B2B2B'
              }}
              type="button"
            >
              <div style={{ width: '8px', height: '8px', background: '#008E5A', borderRadius: '50%' }} />
              <span
                style={{
                  fontFamily: 'SF Pro',
                  fontWeight: 510,
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: '#FBFBFB'
                }}
              >
                Active
              </span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentState('Not Active');
                onUpdateState(project.id, 'Not Active');
                setIsStateMenuOpen(false);
              }}
              className="w-full flex items-center px-3 py-2 hover:bg-[#2B2B2B] transition-colors"
              style={{
                gap: '8px',
                borderBottom: '1px solid #2B2B2B'
              }}
              type="button"
            >
              <div style={{ width: '8px', height: '8px', background: '#8E1F00', borderRadius: '50%' }} />
              <span
                style={{
                  fontFamily: 'SF Pro',
                  fontWeight: 510,
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: '#FBFBFB'
                }}
              >
                Not Active
              </span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentState('Pending');
                onUpdateState(project.id, 'Pending');
                setIsStateMenuOpen(false);
              }}
              className="w-full flex items-center px-3 py-2 hover:bg-[#2B2B2B] transition-colors"
              style={{ gap: '8px' }}
              type="button"
            >
              <div style={{ width: '8px', height: '8px', background: '#DC6300', borderRadius: '50%' }} />
              <span
                style={{
                  fontFamily: 'SF Pro',
                  fontWeight: 510,
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: '#FBFBFB'
                }}
              >
                Pending
              </span>
            </button>
          </div>
        )}
      </div>
      <div className="w-[99px] py-3 px-1 text-center">
        <span style={{ ...textStyle, color: '#999999' }}>{project.totalAmount}</span>
      </div>
      <div className="w-[172px] py-3 px-1">
        <span style={{ ...textStyle, color: '#999999' }}>{project.startDate} → {project.endDate}</span>
      </div>
      <div className="w-[57px] py-3 px-1 flex justify-center">
        <Icons.More />
      </div>
    </div>
  );
};

// Text style constant
const textStyle: React.CSSProperties = {
  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
  fontSize: 12,
  fontWeight: 510,
  lineHeight: '16px',
  letterSpacing: '0.005em',
};

// Company Details Component
const CompanyDetails: React.FC<CompanyDetailsProps> = ({ company, isOpen, onClose, updateCompanyState }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const [tags, setTags] = useState<string[]>(company?.tags || ['test', 'test', 'test']);
  const [isTypeMenuOpen, setIsTypeMenuOpen] = useState(false);
  const [typeOptions, setTypeOptions] = useState<string[]>(['Big Company', 'Small Company', 'Medium Company', 'Startup']);
  const [newTypeValue, setNewTypeValue] = useState('');
  const [currentType, setCurrentType] = useState<string>(company?.type || 'Big Company');
  const [projectsList, setProjectsList] = useState<Array<{
    id: string;
    name: string;
    state: string;
    totalAmount: string;
    startDate: string;
    endDate: string;
  }>>([]);
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleProjectDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setProjectsList((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = [...items];
        const [movedItem] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, movedItem);
        return newItems;
      });
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && company) {
      setIsMounted(true);
      setShouldAnimate(false);
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, 10);
      return () => clearTimeout(timer);
    } else if (!isOpen) {
      setShouldAnimate(false);
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, company]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isStatusMenuOpen && !target.closest('[data-status-menu]') && !target.closest('[data-status-button]')) {
        setIsStatusMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isStatusMenuOpen]);

  useEffect(() => {
    if (company?.tags) {
      setTags(company.tags);
    }
  }, [company?.tags]);

  useEffect(() => {
    const companyName = company?.companyName || 'ECOTREND';
    const newProjects = company?.projects || [
      { id: '1', name: companyName, state: 'Pending', totalAmount: '4,000,000', startDate: '25/12/1', endDate: '25/12/13' },
      { id: '2', name: companyName, state: 'Pending', totalAmount: '4,000,000', startDate: '25/12/1', endDate: '25/12/13' },
      { id: '3', name: companyName, state: 'Pending', totalAmount: '4,000,000', startDate: '25/12/1', endDate: '25/12/13' },
    ];
    setProjectsList(newProjects);
  }, [company?.projects, company?.companyName]);

  if (!company || !isMounted) return null;

  const companyName = company.companyName || 'ECOTREND';

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-500 ease-out z-40 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[600px] transition-transform duration-500 ease-out z-50 overflow-y-auto ${
          shouldAnimate ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: '#111111',
          border: '1px solid #2B2B2B',
          boxShadow: '-5px 5px 20px rgba(0, 0, 0, 0.55)',
          borderRadius: '0px 8px 8px 0px',
          willChange: 'transform',
        }}
      >
        {/* Header with Background Image */}
        <div className="relative h-[200px] w-full">
          {/* Background Image */}
          <img
            src="/Frame 324.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, #000000 100%)',
              borderBottom: '1px solid #2B2B2B',
            }}
          />

          {/* Top Action Buttons */}
          <div className="absolute top-[14px] left-[14px] flex gap-1">
            <button
              className="flex items-center justify-center w-6 h-6 rounded-lg"
              style={{ background: '#222222' }}
              type="button"
            >
              <Icons.Frame409 />
            </button>
            <button
              className="flex items-center justify-center w-6 h-6 rounded-lg"
              style={{ background: '#222222' }}
              type="button"
            >
              <Icons.Frame228 />
            </button>
          </div>

          {/* Company Logo and Name */}
          <div className="absolute bottom-[17px] left-[17px] flex items-center gap-3">
            <div
              className="flex-shrink-0 rounded-[14.8px] overflow-hidden"
              style={{ width: 70, height: 70, background: '#1a1a1a' }}
            >
              <img
                src="/Frame 312.png"
                alt="Company logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-[3px]">
              <span style={{ ...textStyle, color: '#FFFFFF' }}>
                {companyName}
              </span>
              <span style={{ ...textStyle, color: '#999999' }}>Software</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col px-[17px] pt-[22px] pb-6 gap-[22px]" style={{ background: '#111111' }}>
          {/* Description Section */}
          <div className="flex flex-col gap-1">
            <span style={{ ...textStyle, color: '#999999' }}>Description</span>
            <p style={{ ...textStyle, color: '#999999' }}>
              {company.description || `${companyName} is a software and technology services company focused on delivering digital solutions for businesses. The company provides web development, mobile apps, and enterprise management systems, helping clients improve productivity and streamline operations.`}
            </p>
          </div>

          {/* Business Address */}
          <div className="flex flex-col gap-1">
            <span style={{ ...textStyle, color: '#999999' }}>Business Address:</span>
            <div className="flex items-center justify-between gap-2">
              <span style={{ ...textStyle, color: '#999999', flex: 1 }}>
                {company.address || 'Iraq - Baghdad - Karada - St 62. Floor 3 Room 12'}
              </span>
              <button
                className="flex items-center gap-1 px-2 py-1 rounded-lg"
                style={{ background: '#676767' }}
                type="button"
                onClick={() => {
                  const address = company.address || 'Iraq - Baghdad - Karada - St 62. Floor 3 Room 12';
                  const encodedAddress = encodeURIComponent(address);
                  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
                  window.open(googleMapsUrl, '_blank');
                }}
              >
                <div className="flex items-center gap-1.5 px-1.5">
                  <img src="/icon compan/Location.svg" alt="" width="12" height="12" />
                  <span style={{ ...textStyle, color: '#FFFFFF' }}>Google Map</span>
                </div>
                <div style={{ width: 1, height: 12, background: 'rgba(30, 30, 30, 0.5)' }} />
                <Icons.ArrowDown />
              </button>
            </div>
          </div>

          <Divider />

          {/* Status, Tags, Priority & Contact Info */}
          <div className="flex gap-2">
            {/* Left Column */}
            <div className="flex gap-1">
              {/* Labels */}
              <div className="flex flex-col gap-2.5">
                <div className="relative">
                  <FieldRow icon={<Icons.Essential />} label="Status">
                    <button
                      data-status-button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsStatusMenuOpen(!isStatusMenuOpen);
                      }}
                      className="cursor-pointer"
                      type="button"
                    >
                      <Badge 
                        color={
                          company.state === 'Active' ? '#008E5A' : 
                          company.state === 'Not Active' ? '#8E1F00' : 
                          '#DC6300'
                        } 
                        hasArrow
                      >
                        {company.state || 'Pending'}
                      </Badge>
                    </button>
                  </FieldRow>
                  {isStatusMenuOpen && updateCompanyState && (
                    <div
                      data-status-menu
                      className="absolute top-full left-0 mt-1 z-50"
                      style={{
                        width: '120px',
                        background: '#000000',
                        border: '1px solid #2B2B2B',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.4)',
                        overflow: 'hidden',
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateCompanyState(company.id, 'Active');
                          setIsStatusMenuOpen(false);
                        }}
                        className="w-full flex items-center px-3 py-2 hover:bg-[#2B2B2B] transition-colors"
                        style={{
                          gap: '8px',
                          borderBottom: '1px solid #2B2B2B'
                        }}
                        type="button"
                      >
                        <div style={{ width: '8px', height: '8px', background: '#008E5A', borderRadius: '50%' }} />
                        <span
                          style={{
                            fontFamily: 'SF Pro',
                            fontWeight: 510,
                            fontSize: '12px',
                            lineHeight: '16px',
                            color: '#FBFBFB'
                          }}
                        >
                          Active
                        </span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateCompanyState(company.id, 'Not Active');
                          setIsStatusMenuOpen(false);
                        }}
                        className="w-full flex items-center px-3 py-2 hover:bg-[#2B2B2B] transition-colors"
                        style={{
                          gap: '8px',
                          borderBottom: '1px solid #2B2B2B'
                        }}
                        type="button"
                      >
                        <div style={{ width: '8px', height: '8px', background: '#8E1F00', borderRadius: '50%' }} />
                        <span
                          style={{
                            fontFamily: 'SF Pro',
                            fontWeight: 510,
                            fontSize: '12px',
                            lineHeight: '16px',
                            color: '#FBFBFB'
                          }}
                        >
                          Not Active
                        </span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateCompanyState(company.id, 'Pending');
                          setIsStatusMenuOpen(false);
                        }}
                        className="w-full flex items-center px-3 py-2 hover:bg-[#2B2B2B] transition-colors"
                        style={{ gap: '8px' }}
                        type="button"
                      >
                        <div style={{ width: '8px', height: '8px', background: '#DC6300', borderRadius: '50%' }} />
                        <span
                          style={{
                            fontFamily: 'SF Pro',
                            fontWeight: 510,
                            fontSize: '12px',
                            lineHeight: '16px',
                            color: '#FBFBFB'
                          }}
                        >
                          Pending
                        </span>
                      </button>
                    </div>
                  )}
                </div>
                <FieldRow icon={<Icons.Tag />} label="Tags">
                  <div className="flex items-center gap-1">
                    {tags.slice(0, 3).map((tag, index) => (
                      <Badge 
                        key={index} 
                        color="rgba(88, 66, 200, 0.5)" 
                        hasClose
                        onClose={() => {
                          setTags(prevTags => prevTags.filter((_, i) => i !== index));
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                    {tags.length > 3 && <Badge color="#3F3F3F">+{tags.length - 3}</Badge>}
                  </div>
                </FieldRow>
                <FieldRow icon={<Icons.Flag />} label="Priority">
                  <Badge color="#FF4B59">
                    <Icons.FlagWhite />
                    <span style={{ marginLeft: '2px' }}>{company.priority || 'Urgent'}</span>
                  </Badge>
                </FieldRow>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex gap-1 ml-2">
              {/* Labels */}
              <div className="flex flex-col gap-2.5">
                <FieldRow icon={<Icons.Call />} label="Phone">
                  <div className="flex items-center gap-1">
                    <div
                      className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-md"
                      style={{ background: '#0C2D25' }}
                    >
                      <Icons.ArrowDownGray />
                      <span style={{ ...textStyle, color: '#FFFFFF', whiteSpace: 'nowrap' }}>+964</span>
                      <div style={{ width: 1, height: 12, background: 'rgba(30, 30, 30, 0.5)' }} />
                      <span style={{ ...textStyle, color: '#FFFFFF', whiteSpace: 'nowrap' }}>{company.phone || '770 330 620 94'}</span>
                    </div>
                    <div className="flex items-center justify-center w-6 h-6 rounded-lg">
                      <Icons.Messages />
                    </div>
                  </div>
                </FieldRow>
                <FieldRow icon={<Icons.Email />} label="Email">
                  <Badge color="#5842C8">{company.email || 'Support@vodex.tech'}</Badge>
                </FieldRow>
                <FieldRow icon={<Icons.Users />} label="Assignees">
                  <div className="flex items-center gap-1">
                    <Avatar initials={company.assignee?.initials || 'AR'} showStatus />
                    <span style={{ ...textStyle, color: '#999999' }}>{company.assignee?.name || 'Support'}</span>
                  </div>
                </FieldRow>
              </div>
            </div>
          </div>

          <Divider />

          {/* Type, Website, Created, Date, Updated */}
          <div className="flex gap-2">
            {/* Left Section */}
            <div className="flex gap-1">
              <div className="flex flex-col gap-2.5">
                <div className="relative">
                  <FieldRow icon={<Icons.Building />} label="Type">
                    <button
                      data-type-button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsTypeMenuOpen(!isTypeMenuOpen);
                      }}
                      className="cursor-pointer"
                      type="button"
                    >
                      <Badge color="#676767" hasArrow>{currentType}</Badge>
                    </button>
                  </FieldRow>
                  {isTypeMenuOpen && (
                    <div
                      data-type-menu
                      className="absolute top-full left-0 mt-1 z-50"
                      style={{
                        width: '180px',
                        background: '#000000',
                        border: '1px solid #2B2B2B',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.4)',
                        overflow: 'hidden',
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {typeOptions.map((option, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentType(option);
                            setIsTypeMenuOpen(false);
                          }}
                          className="w-full flex items-center px-3 py-2 hover:bg-[#2B2B2B] transition-colors"
                          style={{
                            gap: '8px',
                            borderBottom: index < typeOptions.length - 1 ? '1px solid #2B2B2B' : 'none'
                          }}
                          type="button"
                        >
                          <span
                            style={{
                              fontFamily: 'SF Pro',
                              fontWeight: 510,
                              fontSize: '12px',
                              lineHeight: '16px',
                              color: '#FBFBFB'
                            }}
                          >
                            {option}
                          </span>
                        </button>
                      ))}
                      <div
                        style={{
                          borderTop: '1px solid #2B2B2B',
                          padding: '8px',
                          background: '#141414'
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={newTypeValue}
                            onChange={(e) => setNewTypeValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && newTypeValue.trim()) {
                                if (!typeOptions.includes(newTypeValue.trim())) {
                                  setTypeOptions([...typeOptions, newTypeValue.trim()]);
                                }
                                setCurrentType(newTypeValue.trim());
                                setNewTypeValue('');
                                setIsTypeMenuOpen(false);
                              }
                            }}
                            placeholder="Add new type..."
                            className="flex-1 px-2 py-1 rounded"
                            style={{
                              background: '#2B2B2B',
                              border: '1px solid #3B3B3B',
                              color: '#FFFFFF',
                              fontSize: '12px',
                              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <FieldRow icon={<Icons.Link />} label="Website">
                  <Badge color="rgba(0, 109, 230, 0.5)" hasClose>{company.website || 'www.ecotrend.com'}</Badge>
                </FieldRow>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex gap-1 ml-2">
              <div className="flex flex-col gap-2.5">
                <FieldRow icon={<Icons.Calendar />} label="Created" />
                <FieldRow icon={<Icons.Calendar />} label="Date" />
                <FieldRow icon={<Icons.Time />} label="Updated" />
              </div>
              <div className="flex flex-col gap-2.5 pl-2">
                <div className="flex items-center gap-1 py-1">
                  <Avatar initials="AR" showStatus />
                  <span style={{ ...textStyle, color: '#999999' }}>Support</span>
                </div>
                <div className="flex items-center gap-1 py-1">
                  <span style={{ ...textStyle, color: '#999999' }}>2025/12/1</span>
                  <div className="w-1 h-1 rounded-full bg-[#999999]" />
                  <span style={{ ...textStyle, color: '#999999' }}>Sunday</span>
                </div>
                <div className="flex items-center gap-1 py-1">
                  <span style={{ ...textStyle, color: '#999999' }}>{company.updatedAt || '2025/12/1'}</span>
                  <div className="w-1 h-1 rounded-full bg-[#999999]" />
                  <span style={{ ...textStyle, color: '#999999' }}>12:29</span>
                  <span style={{ ...textStyle, color: '#999999' }}>pm</span>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* Contact Person */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Avatar initials={company.contact?.name?.charAt(0) || 'W'} size={24} />
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center gap-1">
                  <span style={{ ...textStyle, color: '#999999' }}>{company.contact?.name || 'Wissam Iskender'}</span>
                  <div className="w-1 h-1 rounded-full bg-[#999999]" />
                  <span style={{ ...textStyle, color: '#999999' }}>{company.contact?.role || 'Business Owner'}</span>
                </div>
                <p style={{ ...textStyle, color: '#999999' }}>
                  {company.contact?.description || 'Wissam Iskender is a software and technology services company focused on delivering digital solutions for businesses. The company provides web development.'}
                </p>
              </div>
            </div>

            {/* Contact Details Grid */}
            <div className="flex mt-2">
              <div className="flex-1">
                <FieldRow icon={<Icons.Call />} label="Phone">
                  <div
                    className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-md"
                    style={{ background: '#393939' }}
                  >
                    <span style={{ ...textStyle, color: '#FFFFFF' }}>+964</span>
                    <div style={{ width: 1, height: 12, background: 'rgba(30, 30, 30, 0.5)' }} />
                    <span style={{ ...textStyle, color: '#FFFFFF' }}>{company.contact?.phone || '770 330 620 94'}</span>
                  </div>
                </FieldRow>
                <div className="mt-2">
                  <FieldRow icon={<Icons.Email />} label="Email">
                    <div
                      className="flex items-center px-1.5 py-0.5 rounded-md"
                      style={{ background: '#393939' }}
                    >
                      <span style={{ ...textStyle, color: '#FFFFFF' }}>{company.contact?.email || 'Support@vodex.tech'}</span>
                    </div>
                  </FieldRow>
                </div>
              </div>
              <div className="flex-1">
                <FieldRow icon={<Icons.Home />} label="Home">
                  <span style={{ ...textStyle, color: '#999999' }}>{company.contact?.address || 'Iraq Baghdad Karada St.30'}</span>
                </FieldRow>
                <div className="mt-2">
                  <FieldRow icon={<Icons.Calendar />} label="First Contact">
                    <div className="flex items-center gap-1">
                      <span style={{ ...textStyle, color: '#999999' }}>{company.contact?.firstContact || '2025/12/1'}</span>
                      <div className="w-1 h-1 rounded-full bg-[#999999]" />
                      <span style={{ ...textStyle, color: '#999999' }}>Sunday</span>
                    </div>
                  </FieldRow>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Table */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleProjectDragEnd}
          >
            <div
              className="rounded-xl overflow-hidden"
              style={{ background: '#141414', border: '1px solid #2B2B2B' }}
            >
              {/* Table Header */}
              <div className="flex" style={{ background: '#2B2B2B' }}>
                <div className="w-[20px] py-3 px-5" />
                <div className="w-[126px] py-3 px-1">
                  <span style={{ ...textStyle, color: '#FBFBFB' }}>Projects</span>
                </div>
                <div className="w-[94px] py-3 px-1 text-center">
                  <span style={{ ...textStyle, color: '#FBFBFB' }}>States</span>
                </div>
                <div className="w-[99px] py-3 px-1 text-center">
                  <span style={{ ...textStyle, color: '#FBFBFB' }}>Total Amount</span>
                </div>
                <div className="w-[172px] py-3 px-1">
                  <span style={{ ...textStyle, color: '#FBFBFB' }}>Start → End</span>
                </div>
                <div className="w-[57px] py-3 px-1">
                  <span style={{ ...textStyle, color: '#FBFBFB' }}>Actions</span>
                </div>
              </div>

              {/* Table Rows */}
              <SortableContext items={projectsList.map(p => p.id)} strategy={verticalListSortingStrategy}>
                {projectsList.map((project, index) => (
                  <SortableProjectRow
                    key={project.id}
                    project={project}
                    index={index}
                    totalProjects={projectsList.length}
                    onUpdateState={(projectId, newState) => {
                      setProjectsList(prevProjects =>
                        prevProjects.map(p =>
                          p.id === projectId ? { ...p, state: newState } : p
                        )
                      );
                    }}
                  />
                ))}
              </SortableContext>

              {/* Add New Row */}
              <div className="py-3 px-5">
                <button 
                  type="button" 
                  onClick={() => setIsAddProjectDialogOpen(true)}
                  style={{ ...textStyle, color: '#999999', cursor: 'pointer', background: 'none', border: 'none' }}
                >
                  Add new+
                </button>
              </div>
            </div>
          </DndContext>
        </div>
      </div>

      <AddProjectDialog
        isOpen={isAddProjectDialogOpen}
        onClose={() => setIsAddProjectDialogOpen(false)}
        onAdd={(project) => {
          const newProject = {
            ...project,
            id: Date.now().toString(),
          };
          setProjectsList(prev => [...prev, newProject]);
        }}
      />
    </>
  );
};

export default CompanyDetails;