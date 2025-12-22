const AlertNote = ({ block }: any) => {
    return (
        <div className="p-6 my-6 bg-amber-500/5 border-l-4 border-amber-500 rounded-r-2xl">
            <h4 className="text-amber-500 font-bold mb-1 uppercase text-xs tracking-widest">{block.data.title}</h4>
            <p className="text-slate-300">{block.data.message}</p>
        </div>
    );
};

export default AlertNote;