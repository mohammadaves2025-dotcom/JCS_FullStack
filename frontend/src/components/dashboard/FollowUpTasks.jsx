import React from 'react';
import { FiPhoneCall, FiCalendar, FiArrowRight } from 'react-icons/fi';

const FollowUpTasks = ({ followUps }) => {
    return (
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-saas border border-gray-100 flex flex-col h-full hover:shadow-saas-hover transition-shadow duration-500">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-gray-900 tracking-tight">Daily Tasks</h3>
                <span className="bg-red-50 text-red-500 border border-red-100 font-black text-[10px] px-4 py-2 rounded-full uppercase tracking-widest shadow-sm">
                    {followUps.length} Pending
                </span>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 hide-scrollbar">
                {followUps.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-300 pb-10">
                        <div className="w-20 h-20 bg-gray-50 rounded-[1.5rem] flex items-center justify-center mb-4">
                            <FiCalendar className="text-4xl text-gray-200" />
                        </div>
                        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Inbox zero!</p>
                    </div>
                ) : (
                    followUps.map((lead) => (
                        <div key={lead._id} className="group p-5 rounded-[1.5rem] border border-gray-100 hover:border-jcs-brand hover:shadow-[0_10px_20px_-10px_rgba(0,208,132,0.15)] transition-all bg-gray-50 hover:bg-white cursor-pointer flex flex-col justify-center">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-gray-900 text-lg group-hover:text-jcs-deep transition-colors">{lead.name}</h4>
                                <a href={`tel:${lead.phone}`} className="w-10 h-10 rounded-xl bg-white border border-gray-100 text-jcs-brand flex items-center justify-center hover:bg-jcs-brand hover:text-white transition-all shadow-sm">
                                    <FiPhoneCall size={16} />
                                </a>
                            </div>
                            <p className="text-xs text-gray-500 mb-3 truncate font-medium">Course: <span className="font-bold text-gray-700">{lead.interestedCourse}</span></p>
                            <div className="flex items-center text-[10px] font-extrabold text-jcs-brand uppercase tracking-widest">
                                View Lead <FiArrowRight className="ml-1 group-hover:translate-x-2 transition-transform" />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FollowUpTasks;