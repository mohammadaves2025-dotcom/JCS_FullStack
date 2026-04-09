import React from 'react';

const StatCard = ({ icon, title, value, iconBgColor, iconTextColor, valueColor = "text-gray-900" }) => {
    return (
        <div className="bg-white p-8 rounded-[2.5rem] shadow-saas hover:shadow-saas-hover hover:-translate-y-1 transition-all duration-500 border border-gray-100 flex items-center gap-6 group cursor-default">
            <div className={`w-16 h-16 rounded-[1.5rem] ${iconBgColor} ${iconTextColor} flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
                <h3 className={`text-3xl font-black tracking-tight ${valueColor}`}>{value}</h3>
            </div>
        </div>
    );
};

export default StatCard;