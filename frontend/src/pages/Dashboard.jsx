import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FiUsers, FiDollarSign, FiTrendingUp } from 'react-icons/fi';

import StatCard from '../components/dashboard/StatCard';
import RevenueProgress from '../components/dashboard/RevenueProgress';
import PipelineDistribution from '../components/dashboard/PipelineDistribution';
import FollowUpTasks from '../components/dashboard/FollowUpTasks';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({
        leads: 0,
        conversions: 0,
        revenue: { totalRevenue: 0, totalCollected: 0 },
        statusDistribution: []
    });
    const [followUps, setFollowUps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const statsRes = await axios.get('/api/clients/stats', { withCredentials: true });
                setStats(statsRes.data);

                const followUpRes = await axios.get('/api/inquiries/follow-ups', { withCredentials: true });
                // Bulletproof array extraction (just in case!)
                const extractedFollowUps = Array.isArray(followUpRes.data) ? followUpRes.data : (followUpRes.data.data || []);
                setFollowUps(extractedFollowUps);
            } catch (error) {
                console.error("Error fetching dashboard data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-[3px] border-b-[3px] border-jcs-brand"></div>
            </div>
        );
    }

    const collectionPercentage = stats.revenue.totalRevenue > 0
        ? Math.round((stats.revenue.totalCollected / stats.revenue.totalRevenue) * 100)
        : 0;

    return (
        <div className="max-w-[1400px] mx-auto animate-fade-in-up pb-12">

            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Welcome Back, {user?.name || 'Admin'}</h1>
                <p className="text-gray-500 font-medium">Here is the current state of your consultancy operations.</p>
            </div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                <StatCard
                    icon={<FiUsers />} title="Total Waitlist" value={stats.leads}
                    iconBgColor="bg-blue-50" iconTextColor="text-blue-500"
                />
                <StatCard
                    icon={<FiTrendingUp />} title="Converted Clients" value={stats.conversions}
                    iconBgColor="bg-jcs-brand/10" iconTextColor="text-jcs-brand"
                />
                <StatCard
                    icon={<FiDollarSign />} title="Expected Revenue" value={formatCurrency(stats.revenue.totalRevenue)}
                    iconBgColor="bg-purple-50" iconTextColor="text-purple-500"
                />
                <StatCard
                    icon={<FiDollarSign />} title="Collected So Far" value={formatCurrency(stats.revenue.totalCollected)}
                    iconBgColor="bg-jcs-deep" iconTextColor="text-white" valueColor="text-jcs-deep"
                />
            </div>

            {/* Middle Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">
                    <RevenueProgress
                        collectionPercentage={collectionPercentage}
                        totalRevenue={stats.revenue.totalRevenue}
                        formatCurrency={formatCurrency}
                    />
                    <PipelineDistribution statusDistribution={stats.statusDistribution} />
                </div>
                <FollowUpTasks followUps={followUps} />
            </div>
        </div>
    );
};

export default Dashboard;