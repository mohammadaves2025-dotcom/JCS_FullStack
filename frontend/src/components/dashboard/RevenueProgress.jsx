import React from 'react';

const RevenueProgress = ({ collectionPercentage, totalRevenue, formatCurrency }) => {
    return (
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-saas hover:shadow-saas-hover transition-shadow duration-500 border border-gray-100 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-jcs-brand opacity-5 rounded-full blur-3xl pointer-events-none"></div>

            <h3 className="text-xl font-black text-gray-900 mb-8 tracking-tight">Revenue Collection</h3>

            <div className="flex justify-between items-end mb-5 relative z-10">
                <div>
                    <span className="text-6xl font-black text-jcs-deep tracking-tighter">{collectionPercentage}%</span>
                    <span className="text-gray-400 font-extrabold ml-2 uppercase tracking-widest text-[10px]">Collected</span>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Target Revenue</p>
                    <p className="text-xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
                </div>
            </div>

            <div className="w-full bg-gray-50 rounded-full h-4 overflow-hidden shadow-inner relative z-10 border border-gray-100">
                <div
                    className="bg-gradient-to-r from-jcs-brand to-jcs-brand-light h-full rounded-full transition-all duration-1000 ease-out shadow-glow"
                    style={{ width: `${collectionPercentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default RevenueProgress;