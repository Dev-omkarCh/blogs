const Quote = ({block} : any) => {
  return (
    <div className="my-16 px-12 border-l-2 border-indigo-500/30">
      <p className="text-4xl font-serif italic text-white/90 leading-tight">"{block.data.text}"</p>
      <p className="text-indigo-500 font-bold mt-4 uppercase tracking-widest text-xs">— {block.data.author}</p>
    </div>
  );
};

export default Quote;