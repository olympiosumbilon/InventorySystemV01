import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
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
import {
    DollarSign,
    ShoppingCart,
    Users,
    AlertTriangle,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    ArrowDownRight,
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../components/ui/card';
import '../../styles/theme.css';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const menuItems = [
    { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
    { 
        name: 'Inventory', 
        icon: ShoppingCartIcon, 
        path: '/inventory',
        subItems: [
            { name: 'All Items', path: '/inventory/all' },
            { name: 'Categories', path: '/inventory/categories' },
            { name: 'Stock Levels', path: '/inventory/stock-levels' },
            { name: 'Suppliers', path: '/inventory/suppliers' },
        ]
    },
    { name: 'Customers', icon: UserGroupIcon, path: '/customers' },
    { name: 'Reports', icon: ChartBarIcon, path: '/reports' },
    { name: 'Settings', icon: CogIcon, path: '/settings' },
];

const Dashboard = () => {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsCollapsed(true);
            }
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleMenuClick = (item: any) => {
        if (item.subItems) {
            setExpandedMenu(expandedMenu === item.name ? null : item.name);
        } else {
            setIsMobileMenuOpen(false);
        }
    };

    // Sample data - Replace with your actual data
    const salesData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Sales',
                data: [12000, 19000, 15000, 25000, 22000, 30000],
                borderColor: '#2171B5',
                backgroundColor: 'rgba(33, 113, 181, 0.1)',
                tension: 0.4,
            },
        ],
    };

    const inventoryData = {
        labels: ['Electronics', 'Clothing', 'Food', 'Books', 'Others'],
        datasets: [
            {
                label: 'Current Stock',
                data: [300, 500, 200, 150, 100],
                backgroundColor: [
                    '#2171B5',
                    '#6BAED6',
                    '#BDD7E7',
                    '#EFF3FF',
                    '#2171B5',
                ],
            },
        ],
    };

    const lowStockData = {
        labels: ['Low Stock Items'],
        datasets: [
            {
                data: [12],
                backgroundColor: ['#FFB800'], // Warning color
            },
        ],
    };

    const stats = [
        {
            name: 'Total Sales',
            value: '$123,456',
            icon: DollarSign,
            change: '+12%',
            changeType: 'positive',
            trend: 'up',
        },
        {
            name: 'Total Orders',
            value: '1,234',
            icon: ShoppingCart,
            change: '+8%',
            changeType: 'positive',
            trend: 'up',
        },
        {
            name: 'Active Customers',
            value: '456',
            icon: Users,
            change: '-5%',
            changeType: 'negative',
            trend: 'down',
        },
        {
            name: 'Low Stock Items',
            value: '12',
            icon: AlertTriangle,
            change: '-2%',
            changeType: 'warning',
            trend: 'down',
        },
    ];

    const getStatusColor = (type: string) => {
        switch (type) {
            case 'positive':
                return 'text-green-600';
            case 'negative':
                return 'text-red-600';
            case 'warning':
                return 'text-[#FFB800]';
            default:
                return 'text-[#6BAED6]';
        }
    };

    const getStatusBgColor = (type: string) => {
        switch (type) {
            case 'positive':
                return 'bg-green-50';
            case 'negative':
                return 'bg-red-50';
            case 'warning':
                return 'bg-[#FFB800]/10';
            default:
                return 'bg-[#EFF3FF]';
        }
    };

    return (
        <div className="flex min-h-screen bg-[#EFF3FF]">
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
                                const isActive = location.pathname === item.path || 
                                    (item.subItems && item.subItems.some(subItem => location.pathname === subItem.path));
                                const isExpanded = expandedMenu === item.name;

                                return (
                                    <li key={item.name}>
                                        <div>
                                            {item.subItems ? (
                                                <button
                                                    className={`w-full flex items-center p-4 rounded-lg transition-all ${
                                                        isActive
                                                            ? 'bg-[#EFF3FF] text-[#2171B5] font-medium'
                                                            : 'text-[#6BAED6] hover:bg-[#EFF3FF] hover:text-[#2171B5]'
                                                    }`}
                                                    onClick={() => handleMenuClick(item)}
                                                    aria-expanded={isExpanded}
                                                >
                                                    <item.icon 
                                                        className={`h-6 w-6 ${isActive ? 'text-[#2171B5]' : 'text-[#6BAED6]'}`}
                                                        aria-hidden="true"
                                                    />
                                                    {!isCollapsed && (
                                                        <span className="ml-4 flex-1 text-left">{item.name}</span>
                                                    )}
                                                    {!isCollapsed && (
                                                        <ChevronRightIcon 
                                                            className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                </button>
                                            ) : (
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
                                            )}
                                            {!isCollapsed && item.subItems && isExpanded && (
                                                <ul className="mt-2 space-y-2">
                                                    {item.subItems.map((subItem) => {
                                                        const isSubActive = location.pathname === subItem.path;
                                                        return (
                                                            <li key={subItem.name}>
                                                                <Link
                                                                    to={subItem.path}
                                                                    className={`block p-2 pl-12 rounded-lg transition-all ${
                                                                        isSubActive
                                                                            ? 'bg-[#EFF3FF] text-[#2171B5] font-medium'
                                                                            : 'text-[#6BAED6] hover:bg-[#EFF3FF] hover:text-[#2171B5]'
                                                                    }`}
                                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                                    aria-current={isSubActive ? 'page' : undefined}
                                                                >
                                                                    {subItem.name}
                                                                </Link>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            )}
                                        </div>
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

            {/* Main Content */}
            <div
                className={`flex-1 p-4 md:p-6 transition-all duration-300 ${
                    isCollapsed ? 'ml-20' : 'ml-72'
                }`}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#2171B5]">Dashboard</h1>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-[#6BAED6]">Last updated:</span>
                            <span className="text-sm font-medium text-[#2171B5]">Just now</span>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {stats.map((stat) => (
                            <Card key={stat.name} className="bg-white border-[#BDD7E7]">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-[#2171B5]">
                                        {stat.name}
                                    </CardTitle>
                                    <stat.icon className="h-4 w-4 text-[#6BAED6]" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-[#2171B5]">{stat.value}</div>
                                    <div className={`mt-2 flex items-center gap-1 ${getStatusBgColor(stat.changeType)} p-1 rounded`}>
                                        {stat.trend === 'up' ? (
                                            <ArrowUpRight className="h-3 w-3 text-green-600" />
                                        ) : (
                                            <ArrowDownRight className="h-3 w-3 text-red-600" />
                                        )}
                                        <p className={`text-xs ${getStatusColor(stat.changeType)}`}>
                                            {stat.change} from last month
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                        {/* Sales Trend */}
                        <Card className="bg-white border-[#BDD7E7]">
                            <CardHeader>
                                <CardTitle className="text-[#2171B5]">Sales Trend</CardTitle>
                                <CardDescription className="text-[#6BAED6]">Monthly sales performance</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <Line
                                        data={salesData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: {
                                                    display: false,
                                                },
                                            },
                                            scales: {
                                                y: {
                                                    beginAtZero: true,
                                                    grid: {
                                                        color: '#BDD7E7',
                                                    },
                                                },
                                                x: {
                                                    grid: {
                                                        display: false,
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Inventory Distribution */}
                        <Card className="bg-white border-[#BDD7E7]">
                            <CardHeader>
                                <CardTitle className="text-[#2171B5]">Inventory Distribution</CardTitle>
                                <CardDescription className="text-[#6BAED6]">Current stock levels by category</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <Bar
                                        data={inventoryData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: {
                                                    display: false,
                                                },
                                            },
                                            scales: {
                                                y: {
                                                    beginAtZero: true,
                                                    grid: {
                                                        color: '#BDD7E7',
                                                    },
                                                },
                                                x: {
                                                    grid: {
                                                        display: false,
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Low Stock Alert */}
                    <Card className="bg-white border-[#BDD7E7]">
                        <CardHeader>
                            <CardTitle className="text-[#2171B5]">Low Stock Alert</CardTitle>
                            <CardDescription className="text-[#6BAED6]">Items that need attention</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[200px]">
                                <Doughnut
                                    data={lowStockData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: 'bottom',
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;