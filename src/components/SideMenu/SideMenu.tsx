import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    HomeIcon,
    ShoppingCartIcon,
    UserGroupIcon,
    ChartBarIcon,
    CogIcon,
    ArrowLeftOnRectangleIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

interface SideMenuProps {
    onCollapse: (collapsed: boolean) => void;
}

const menuItems = [
    { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
    { name: 'Inventory', icon: ShoppingCartIcon, path: '/inventory' },
    { name: 'Customers', icon: UserGroupIcon, path: '/customers' },
    { name: 'Reports', icon: ChartBarIcon, path: '/reports' },
    { name: 'Settings', icon: CogIcon, path: '/settings' },
];

const SideMenu: React.FC<SideMenuProps> = ({ onCollapse }) => {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsCollapsed(true);
                onCollapse(true);
            }
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [onCollapse]);

    const handleCollapse = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        onCollapse(newState);
    };

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                className="fixed top-4 left-4 z-50 p-3 rounded-lg bg-white shadow-lg md:hidden hover:bg-[#EFF3FF] transition-colors"
                onClick={handleMobileMenuToggle}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
            >
                {isMobileMenuOpen ? (
                    <XMarkIcon className="h-6 w-6 text-[#2171B5]" aria-hidden="true" />
                ) : (
                    <Bars3Icon className="h-6 w-6 text-[#2171B5]" aria-hidden="true" />
                )}
            </button>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={handleMobileMenuToggle}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-40
                    ${isCollapsed ? 'w-20' : 'w-72'}
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
                role="navigation"
                aria-label="Main navigation"
            >
                <div className="flex flex-col h-full">
                    {/* Logo/Brand */}
                    <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-[#2171B5] to-[#6BAED6] text-white">
                        {!isCollapsed && (
                            <h1 className="text-2xl font-bold">Inventory System</h1>
                        )}
                        <button
                            onClick={handleCollapse}
                            className="p-2 rounded-lg hover:bg-[#2171B5] transition-colors"
                            aria-label={isCollapsed ? "Expand menu" : "Collapse menu"}
                        >
                            {isCollapsed ? (
                                <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <ChevronLeftIcon className="h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex-1 p-4 overflow-y-auto" role="navigation" aria-label="Main menu">
                        <ul className="space-y-3">
                            {menuItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <li key={item.name}>
                                        <Link
                                            to={item.path}
                                            className={`flex items-center p-4 rounded-lg transition-all ${
                                                isActive
                                                    ? 'bg-[#EFF3FF] text-[#2171B5] font-medium'
                                                    : 'text-[#6BAED6] hover:bg-[#EFF3FF] hover:text-[#2171B5]'
                                            }`}
                                            title={isCollapsed ? item.name : ''}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            aria-current={isActive ? 'page' : undefined}
                                        >
                                            <item.icon 
                                                className={`h-6 w-6 ${isActive ? 'text-[#2171B5]' : 'text-[#6BAED6]'}`}
                                                aria-hidden="true"
                                            />
                                            {!isCollapsed && (
                                                <span className="ml-4">{item.name}</span>
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-[#BDD7E7]">
                        <button
                            className="flex items-center w-full p-4 text-[#6BAED6] rounded-lg hover:bg-[#EFF3FF] hover:text-[#2171B5] transition-colors"
                            onClick={() => {
                                // Add logout logic here
                                console.log('Logout clicked');
                            }}
                            title={isCollapsed ? 'Logout' : ''}
                            aria-label="Logout"
                        >
                            <ArrowLeftOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
                            {!isCollapsed && <span className="ml-4">Logout</span>}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideMenu; 