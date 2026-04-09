import React from 'react';

const PipelineDistribution = ({ statusDistribution }) => {
    return (
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-saas hover:shadow-saas-hover transition-shadow duration-500 border border-gray-100">
            <h3 className="text-xl font-black text-gray-900 mb-8 tracking-tight">Pipeline Distribution</h3>
            
            {statusDistribution.length === 0 ? (
                <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Pipeline Empty</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {statusDistribution.map((status, index) => (
                        <div key={index} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:bg-jcs-brand/10 hover:border-jcs-brand/20 transition-all duration-300 group cursor-default">
                            <h4 className="text-3xl font-black text-jcs-deep mb-2 group-hover:scale-110 transition-transform">{status.count}</h4>
                            <p className="text-[9px] font-extrabold text-gray-500 uppercase tracking-widest leading-tight">{status._id}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PipelineDistribution;