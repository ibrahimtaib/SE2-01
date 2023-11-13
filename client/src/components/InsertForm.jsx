import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import api, { addPage } from "../api/api";
import Tagify from '@yaireo/tagify';

const Types = {
    experimental: "Experimental",
    nrd: "Non-research dissertation",
}

export default function InsertForm() {
    //TODO: IMPORTANT!! Put this states in App.jsx (they are for sure needed somewhere else later in development)
    const [levels, setLevels] = useState(["Bachelor", "Master", "PhD"]);
    const [supervisors, setSupervisors] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [cosupervisors, setCosupervisors] = useState([]);

    const navigateTo = useNavigate();

    const { register, formState: { errors }, handleSubmit } = useForm()
    const inputRef = useRef(null);



    const onSubmit = (data) => {
        addPage({
            ...data,
            expiration: new Date(data.expiration).toISOString(),
            supervisor: parseInt(data.supervisor),
            coSupervisors: cosupervisors.map((cosupervisor) => cosupervisor.trim()), //TODO: Fix in database or here sending of cosupervisors
            keywords: keywords.map((keyword) => keyword.trim()),
            groups: [],
            type: Types.experimental,
        })
        //console.log("formdata", data);
        //TODO: show Proposal added and verify with .then and .catch!
    }

    useEffect(() => {
        const getSupervisors = () => {
            api.get('/teachers')
                .then((response) => {
                    console.log("get supervisors", response.data);
                    setSupervisors(response.data);
                }
                )
        }
        getSupervisors();

        const getDegrees = () => {
            api.get('/degrees')
                .then((response) => {
                    console.log("get degrees", response.data);
                    setDegrees(response.data);
                }
                )
        }
        getDegrees();
    }, [])

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white w-full max-w-3xl mx-auto text-left flex flex-col gap-y-10 px-4 py-6"
        >
            <h1 className="font-sans text-2xl font-bold tracking-tight text-gray-900">New Proposal</h1>
            <div className="flex flex-col gap-y-1">
                <label className="text-base font-semibold leading-7 text-gray-900" htmlFor='title'>
                    Title
                </label>
                {errors.title?.type === "required" && (
                    <p className="mt-3 text-sm leading-6 text-red-500">Field is required</p>
                )}
                <input
                    {...register("title", { required: true })}
                    id="title"
                    autoComplete="title"
                    className="p-2 w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded-md shadow-sm ring-offset-2 ring-2"
                    placeholder="Title of the thesis"
                />
            </div>

            <div className="flex flex-col gap-y-1">
                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor='description'>
                    Description
                </label>
                {errors.description?.type === "required" && (
                    <p className="mt-3 text-sm leading-6 text-red-500">Field is required</p>
                )}
                <textarea
                    {...register("description", { required: true })}
                    id="description"
                    rows={3}
                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                    placeholder="Short description about the thesis..."
                />

            </div>

            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-y-1 w-2/5">
                    <label className=" text-sm font-medium leading-6 text-gray-900" htmlFor='expiration-date'>
                        Expiration date
                    </label>

                    <input
                        {...register("expiration", { required: true })}
                        type='date'
                        id='expiration-date'
                        className=" w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 border border-gray-400 text-gray-700  leading-tight focus:outline-none focus:border-gray-500"
                        min={new Date().toISOString().split('T')[0]}
                    />

                </div>

                <div className="flex flex-col gap-y-1 w-2/5">
                    <label className="text-sm font-medium leading-6 text-gray-900">
                        Level
                    </label>
                    {errors.level?.type === "required" && (
                        <p className="mt-3 text-sm leading-6 text-red-500">Field is required</p>
                    )}
                    <select
                        {...register("level", { required: true })}
                        className="w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 border border-gray-400 text-gray-700  leading-tight focus:outline-none focus:border-gray-500"
                        id="level"
                        name="level"
                    >
                        {levels.map(level => <option key={level} value={level}>{level}</option>)}
                    </select>
                </div>
            </div>

            <div className="flex flex-col gap-y-1">
                <label className="text-sm font-medium leading-6 text-gray-900">
                    Programme/Degree
                </label>
                {errors.cds?.type === "required" && (
                    <p className="mt-3 text-sm leading-6 text-red-500">Field is required</p>
                )}
                <select
                    {...register("cds", { required: true })}
                    id="cds"
                    className="p-2 w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded-md shadow-sm ring-offset-2 ring-2"
                >
                    {degrees.map(degree => <option key={degree.COD_DEGREE} value={degree.COD_DEGREE}>{degree.TITLE_DEGREE}</option>)}
                </select>
            </div>

            <div className="flex flex-col gap-y-1">
                <label className="text-sm font-medium leading-6 text-gray-900">
                    Type
                </label>
                {errors.type?.type === "required" && (
                    <p className="mt-3 text-sm leading-6 text-red-500">Field is required</p>
                )}
                <select
                    {...register("type", { required: true })}
                    className="p-2 w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded-md shadow-sm ring-offset-2 ring-2"
                    id="type"
                    name="type"
                >
                    {Object.entries(Types).map(([key, value]) => (
                        <option key={key} value={key}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>



            <div className="flex flex-col gap-y-1">
                <label className="text-sm font-medium leading-6 text-gray-900">
                    Supervisor
                </label>
                {errors.supervisor?.type === "required" && (
                    <p className="mt-3 text-sm leading-6 text-red-500">Field is required</p>
                )}
                <select
                    {...register("supervisor", { required: true })}
                    id="supervisor"
                    className="p-2 w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded-md shadow-sm ring-offset-2 ring-2"
                >
                    {supervisors.map(supervisor => <option key={supervisor.id} value={supervisor.id}>{supervisor.name} {supervisor.surname}</option>)}
                </select>
            </div>

            <div className="flex flex-col gap-y-1">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    Co-Supervisors
                </label>
                <CosupervisorsInput setCosupervisors={setCosupervisors} />
            </div>

            <div className="flex flex-col gap-y-1">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    Required knowledge
                </label>
                {errors.requiredKnowledge?.type === "required" && (
                    <p className="mt-3 text-sm leading-6 text-red-500">Field is required</p>
                )}
                <input
                    {...register("requiredKnowledge", { required: true })}
                    id="requiredKnowledge"
                    className="p-2 w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded-md shadow-sm ring-offset-2 ring-2"
                />
            </div>

            <div className="flex flex-col gap-y-1">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    Notes - <span className="italic font-normal">Optional</span>
                </label>

                <textarea
                    {...register("notes", { required: false })}
                    id="notes"
                    rows={4}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                    placeholder="Nots about the thesis..."
                />
            </div>

            <div className="flex flex-col gap-y-1">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    Keywords
                </label>
                {errors.keywords?.type === "required" && (
                    <p className="mt-3 text-sm leading-6 text-red-500">Field is required</p>
                )}

                <KeywordsInput setKeywords={setKeywords} />
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="button"
                    onClick={() => navigateTo('/')}
                    className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-slate-800 hover:bg-slate-700 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Add
                </button>
            </div>
        </form>
    )
}


function CosupervisorsInput(props) {
    const inputRef = useRef(null);

    useEffect(() => {
        const tagify = new Tagify(inputRef.current, {
            enforceWhitelist: false,
        });

        tagify.on('add', (e) => {
            props.setCosupervisors((prevCosupervisors) => [...prevCosupervisors, e.detail.data.value]);
            console.log('Cosupervisor added:', e.detail.data.value);
        });

        tagify.on('remove', (e) => {
            const removedCosupervisor = e.detail.data.value;
            // Remove the tag from the state (props.cosupervisors)
            props.setKeywords((prevCosupervisors) =>
                prevCosupervisors.filter((tag) => tag !== removedCosupervisor)
            );
            console.log('Cosupervisor removed:', removedCosupervisor);
        });
        

        return () => {
            tagify.destroy();
        };
    }, []);

    return (
        <div>
            <input ref={inputRef} 
                id="keywords"
                className="p-2 w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded-md shadow-sm ring-offset-2 ring-2 taginput"
                type="text"
                placeholder="Type co-supervisors (if any) and press Enter"
            />
        </div>
    );
};

function KeywordsInput(props) {
    const inputRef = useRef(null);

    useEffect(() => {
        const tagify = new Tagify(inputRef.current, {
            enforceWhitelist: false,
        });

        tagify.on('add', (e) => {
            props.setKeywords((prevKeywords) => [...prevKeywords, e.detail.data.value]);
            console.log('Tag added:', e.detail.data.value);
        });

        tagify.on('remove', (e) => {
            const removedKeyword = e.detail.data.value;
            // Remove the tag from the state (props.cosupervisors)
            props.setKeywords((prevCosupervisors) =>
                prevCosupervisors.filter((tag) => tag !== removedKeyword)
            );
            console.log('Keyword removed:', removedKeyword);
        });

        return () => {
            tagify.destroy();
        };
    }, []);

    return (
        <div>
            <input ref={inputRef} required
                id="keywords"
                className="p-2 w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded-md shadow-sm ring-offset-2 ring-2 taginput"
                type="text"
                placeholder="Type keywords and press Enter"
            />
        </div>
    );
};


