import React, { useState } from 'react';
import SideMenu from '../../components/SideMenu/SideMenu';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../components/ui/card';

const SettingsPage = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [fontSize, setFontSize] = useState(16); // Base font size in pixels

    const handleFontSizeChange = (increase: boolean) => {
        setFontSize(prev => {
            const newSize = increase ? prev + 2 : prev - 2;
            return Math.min(Math.max(newSize, 14), 24); // Limit between 14px and 24px
        });
    };

    return (
        <div className="flex min-h-screen bg-[#EFF3FF]">
            <SideMenu onCollapse={setIsSidebarCollapsed} />
            <div
                className={`flex-1 p-4 md:p-6 transition-all duration-300 ${
                    isSidebarCollapsed ? 'ml-16' : 'ml-64'
                }`}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#2171B5]">Settings</h1>
                    </div>

                    {/* Accessibility Settings */}
                    <Card className="bg-white border-[#BDD7E7] mb-6">
                        <CardHeader>
                            <CardTitle className="text-[#2171B5]">Accessibility</CardTitle>
                            <CardDescription className="text-[#6BAED6]">Customize your viewing experience</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-medium text-[#2171B5] mb-2">Font Size</h3>
                                    <p className="text-sm text-[#6BAED6] mb-4">Adjust the text size to your preference</p>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => handleFontSizeChange(false)}
                                            className="p-2 rounded-lg hover:bg-[#EFF3FF] transition-colors text-[#2171B5] border border-[#BDD7E7]"
                                            aria-label="Decrease font size"
                                        >
                                            A-
                                        </button>
                                        <span className="text-[#2171B5] font-medium">{fontSize}px</span>
                                        <button
                                            onClick={() => handleFontSizeChange(true)}
                                            className="p-2 rounded-lg hover:bg-[#EFF3FF] transition-colors text-[#2171B5] border border-[#BDD7E7]"
                                            aria-label="Increase font size"
                                        >
                                            A+
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage; 