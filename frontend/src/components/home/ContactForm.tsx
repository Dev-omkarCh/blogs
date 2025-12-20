import useQuery from "@/hooks/useQuery";
import { Users } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import LoadingSpinner from "../LoadingSpinner";

export interface ContactForm {
    name: string,
    email: string,
    query: string,
};

const ContactForm = () => {
    const [contactForm, setContactForm] = useState<ContactForm>({
        name: '',
        email: '',
        query: '',
    });
    const {sendQuery, isLoading} = useQuery();
    // const isLoading = true;

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await sendQuery(contactForm)
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setContactForm(prev => ({
                ...prev,
                name: value
            }));
        }
        else if (name === 'email') {
            setContactForm(prev => ({
                ...prev,
                email: value
            }));
        }
        else if (name === 'query') {
            setContactForm(prev => ({
                ...prev,
                query: value
            }));
        }
        else {
            console.error("No Such Input Field Exists");
        }
    };

    return (
        <section className="py-24 px-6">
            <div className="max-w-5xl mx-auto bg-slate-900 rounded-[2.5rem] border border-slate-800 overflow-hidden md:flex shadow-2xl">
                <div className="p-12 md:w-2/5 bg-indigo-600 text-white flex flex-col justify-between">
                    <div>
                        <h2 className="text-4xl font-extrabold mb-4 leading-tight">Let’s build the <br /> future of dev writing.</h2>
                        <p className="text-indigo-100 opacity-80">Join our ambassador program or ask for technical support.</p>
                    </div>
                    <div className="mt-12 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><Users size={20} /></div>
                            <span className="font-medium text-sm">Active Slack Community</span>
                        </div>
                    </div>
                </div>
                <form className="p-12 md:w-3/5 space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            className="bg-slate-950 border border-slate-800 p-4 rounded-2xl 
                            focus:border-indigo-500 outline-none text-white transition-all w-full"
                            value={contactForm.name}
                            onChange={handleInputChange}

                        />
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            className="bg-slate-950 border border-slate-800 p-4 rounded-2xl 
                            focus:border-indigo-500 outline-none text-white transition-all w-full"
                            value={contactForm.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <textarea 
                        placeholder="How can we help?" 
                        name="query"
                        id="query"
                        rows={4} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl 
                        focus:border-indigo-500 outline-none text-white transition-all"
                        value={contactForm.query}
                        onChange={handleInputChange}
                    />
                    <button
                        className={`w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl 
                        transition-all shadow-xl shadow-indigo-500/30
                        ${isLoading && 'bg-indigo-900 hover:bg-indigo-900'} `}
                        style={{ boxShadow : isLoading ? 'none' : ''}}
                        disabled={isLoading}
                    >
                        {isLoading ? <LoadingSpinner /> : "Submit Inquiry"}
                    </button>
                </form>
            </div>
        </section>
    )
};

export default ContactForm;
