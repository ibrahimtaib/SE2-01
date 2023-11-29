import Tagify from '@yaireo/tagify';
import { useEffect, useRef, useState } from "react";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import api, { addPage } from "../api/api";

const Types = {
    experimental: "Experimental",
    nrd: "Non-research dissertation",
}

const styles = {
    form: {
        backgroundColor: "white",
        width: "70%",
        maxWidth: "3xl",
        margin: "auto",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "2.5rem", // Assuming 1 rem is equivalent to 2.5rem
        padding: "1rem 2rem", // Assuming 1 rem is equivalent to 2.5rem
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Example shadow values; adjust as needed
    },
    container: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
    innerContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "40%", // Since "w-2/5" corresponds to a width of 2/5 or 40%
    },
    label: {
        fontSize: "1rem",
        fontWeight: "600",
        lineHeight: "1.75",
        color: "#1a202c",
    },
    input: {
        padding: "0.5rem",
        width: "100%",
        border: "none",
        background: "transparent",
        paddingTop: "0.375rem",
        paddingLeft: "0.25rem",
        color: "#1a202c",
        placeholder: {
            color: "#a0aec0",
        },
        focus: {
            outline: "0",
            ringOffsetWidth: "0",
            ringWidth: "2px",
        },
        fontSize: "0.875rem",
        lineHeight: "1.5",
        borderRadius: "0.375rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
    },
    textarea: {
        width: "100%",
        borderRadius: "0.375rem", // Corresponds to rounded-md in Tailwind
        borderWidth: "0",
        paddingY: "0.375rem", // Corresponds to py-1.5 in Tailwind
        color: "#1a202c", // Replace with your specific text color, here it's text-gray-900
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", // Corresponds to shadow-sm in Tailwind
        boxShadowFocus: "0 0 0 3px rgba(66, 153, 225, 0.5)", // Corresponds to focus:ring-2 in Tailwind
        boxShadowFocusInset: "inset 0 0 0 1px #e2e8f0", // Corresponds to focus:ring-inset in Tailwind
        boxShadowFocusColor: "#3490dc", // Corresponds to focus:ring-indigo-600 in Tailwind
        lineHeight: "1.5", // Corresponds to sm:leading-6 in Tailwind
        fontSize: "0.875rem", // Corresponds to sm:text-sm in Tailwind
        placeholderColor: "#a0aec0", // Replace with your specific placeholder text color, here it's text-gray-400
        focusOutline: "none", // Disable the default focus outline
    },
    select: {
        width: "100%",
        borderRadius: "0.375rem", // You may adjust the radius value according to your design
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", // Adjust the shadow according to your design
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#CBD5E0", // Adjust the color according to your design
        ringWidth: "1px",
        ringStyle: "inset",
        ringColor: "#CBD5E0", // Adjust the color according to your design
        focusRingWidth: "2px",
        focusRingStyle: "inset",
        focusRingColor: "#4F46E5", // Adjust the color according to your design
        outline: "none",
        padding: "0.75rem 1rem", // You may adjust the padding according to your design
        color: "#4A5568", // Adjust the text color according to your design
        lineHeight: "1.25", // You may adjust the line height according to your design
    },
    header: {
        fontSize: "2.25rem", // Equivalent to text-4xl in Tailwind CSS
        fontWeight: "bold",  // Equivalent to font-bold in Tailwind CSS
        letterSpacing: "-0.01em", // Equivalent to tracking-tight in Tailwind CSS
        color: "#1a202c", // Equivalent to text-gray-900 in Tailwind CSS
    },
    buttonContainer: {
        marginTop: "1.5rem", // Assuming default font size is 1rem, as Tailwind uses 1.5rem for mt-6
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        columnGap: "1.5rem", // Assuming default font size is 1rem, as Tailwind uses 1.5rem for gap-x-6
    },
    cancel: {
        fontSize: "0.875rem",
        fontWeight: "400",
        lineHeight: "1.5",
        color: "#1a202c",
    },
    add: {
        backgroundColor: "#1a365d",
        color: "#fff",

    }


}





export default function InsertForm({ user, update, proposalToInsert }) {


    const [levels, setLevels] = useState(["Bachelor", "Master"]);
    const [supervisors, setSupervisors] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [keywords, setKeywords] = useState(proposalToInsert?.keywords);
    const [cosupervisors, setCosupervisors] = useState([]);

    const [serverError, setServerError] = useState(false);
    const [successfullySent, setSuccesfullySent] = useState(false);

    const navigateTo = useNavigate();

    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            cds: proposalToInsert.degree.COD_DEGREE
          }
    })
    const inputRef = useRef(null);


    const onSubmit = (data) => {

        addPage({
            ...data,
            expiration: new Date(data.expiration).toISOString(),
            supervisor: user.id,
            coSupervisors: cosupervisors.map((cosupervisor) => cosupervisor.trim()), //TODO: Fix in database or here sending of cosupervisors
            keywords: keywords.map((keyword) => keyword.trim()),
            groups: [],
        }).then(() => {
            setServerError(false);
            setSuccesfullySent(true);
            setTimeout(() => {

                navigateTo('/');
            }, 4000);

        })
            .catch((error) => {
                setServerError(true);
            });


    }

    useEffect(() => {

        const getSupervisors = () => {
            api.get('/teachers')
                .then((response) => {
                    setSupervisors(response.data);
                }
                )
        }
        getSupervisors();

        const getDegrees = () => {
            api.get('/degrees')
                .then((response) => {
                    setDegrees(response.data);
                }
                )
        }
        getDegrees();
        setKeywords(proposalToInsert?.keywords);
        setCosupervisors(proposalToInsert?.coSupervisors);

    }, [proposalToInsert])

    return (
        <>
            <br></br>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={styles.form}
            >

                <h1
                    className="sans-serif"
                    style={styles.header}
                >
                    {update ? 'Update Proposal' : 'New Proposal'}
                </h1>
                <div style={styles.container}>
                    <label style={styles.label} htmlFor='title'>
                        Title
                    </label>
                    {errors.title?.type === "required" && (
                        <a style={{ color: "red" }}>Field is required</a>
                    )}
                    <input
                        {...register("title", { required: true })}
                        id="title"
                        autoComplete="title"
                        style={styles.input}
                        placeholder="Title of the thesis"
                        defaultValue={proposalToInsert?.title || ''}
                    />
                </div>

                <div style={styles.container}>
                    <label style={styles.label} htmlFor='description'>
                        Description
                    </label>
                    {errors.description?.type === "required" && (
                        <a style={{ color: "red" }}>Field is required</a>
                    )}
                    <textarea
                        {...register("description", { required: true })}
                        id="description"
                        rows={3}
                        style={styles.textarea}
                        defaultValue={proposalToInsert?.description || ''}
                        placeholder="Short description about the thesis..."
                    />

                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div style={styles.innerContainer}>
                        <label
                            style={styles.label}
                            htmlFor='expiration-date'
                        >
                            Expiration date
                        </label>

                        <input
                            {...register("expiration", { required: true })}
                            type='date'
                            id='expiration-date'
                            style={styles.select}
                            min={new Date().toISOString().split('T')[0]}
                            value={proposalToInsert?.expiration}
                        />

                    </div>

                    <div style={styles.innerContainer}>
                        <label style={styles.label}>
                            Level
                        </label>
                        {errors.level?.type === "required" && (
                            <a style={{ color: "red" }}>Field is required</a>
                        )}
                        <select
                            {...register("level", { required: true })}
                            style={styles.select}
                            id="level"
                            name="level"
                        >
                            {levels.map(level => <option key={level} value={level}>{level}</option>)}
                        </select>
                    </div>
                </div>

                <div style={styles.container}>
                    <label style={styles.label}>
                        Programme/Degree
                    </label>
                    {errors.cds?.type === "required" && (
                        <a style={{ color: "red" }}>Field is required</a>
                    )}
                    <select
                        {...register("cds", { required: true })}
                        id="cds"
                        style={styles.select}
                        defaultValue={proposalToInsert.degree.COD_DEGREE}
                    >
                        {degrees.map(degree => <option key={degree.COD_DEGREE} value={degree.COD_DEGREE}>{degree.TITLE_DEGREE}</option>)}
                    </select>
                </div>

                <div style={styles.container}>
                    <label style={styles.label}>
                        Type
                    </label>
                    {errors.type?.type === "required" && (
                        <a style={{ color: "red" }}>Field is required</a>
                    )}
                    <select
                        {...register("type", { required: true })}
                        style={styles.select}
                        id="type"
                        name="type"
                    >
                        {Object.entries(Types).map(([key, value]) => (
                            <option key={key} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={styles.container}>
                    <label style={styles.label}>
                        Co-Supervisors
                    </label>
                    <CosupervisorsInput setCosupervisors={setCosupervisors} initialCosupervisors={proposalToInsert?.coSupervisors} />
                </div>

                <div style={styles.container}>
                    <label style={styles.label}> Required knowledge
                    </label>
                    {errors.requiredKnowledge?.type === "required" && (
                        <a style={{ color: "red" }}>Field is required</a>
                    )}
                    <input
                        {...register("requiredKnowledge", { required: true })}
                        id="requiredKnowledge"
                        style={styles.select}
                        defaultValue={proposalToInsert?.requiredKnowledge}
                    />
                </div>

                <div style={styles.container}>
                    <label style={styles.label}>
                        Notes - <span className="italic font-normal">Optional</span>
                    </label>

                    <textarea
                        {...register("notes", { required: false })}
                        id="notes"
                        rows={4}
                        style={styles.textarea}
                        defaultValue={''}
                        placeholder="Notes about the thesis..."
                    />
                </div>

                <div style={styles.container}>
                    <label style={styles.label}>
                        Keywords
                    </label>
                    {errors.keywords?.type === "required" && (
                        <a style={{ color: "red" }}>Field is required</a>
                    )}

                    <KeywordsInput setKeywords={setKeywords} initialKeywords={proposalToInsert?.keywords} />
                </div>

                {successfullySent ?
                    <Alert variant="success" style={{ width: "100%" }}>
                        Proposal successfully inserted! Redirecting to home page...
                    </Alert> : <div
                        style={styles.buttonContainer}
                    >
                        <Button
                            variant="outline-secondary"
                            onClick={() => navigateTo('/')}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant='dark'
                            style={styles.add}
                        >
                            {update ? 'Update' : 'Add'}
                        </Button>

                    </div>
                }
                {serverError && (
                    <Alert variant="error">
                        An error occurred while inserting the proposal: try again.
                    </Alert>
                )}

            </form>
            <br></br>
            <br></br>
        </>

    )
}


function CosupervisorsInput(props) {
    const inputRef = useRef(null);

    useEffect(() => {
        const tagify = new Tagify(inputRef.current, {
            enforceWhitelist: false,
        });

        tagify.addTags(props.initialCosupervisors);

        tagify.on('add', (e) => {
            props.setCosupervisors((prevCosupervisors) => [...prevCosupervisors, e.detail.data.value]);
        });

        tagify.on('remove', (e) => {
            const removedCosupervisor = e.detail.data.value;
            // Remove the tag from the state (props.cosupervisors)
            props.setCosupervisors((prevCosupervisors) =>
                prevCosupervisors.filter((tag) => tag !== removedCosupervisor)
            );
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
}

function KeywordsInput(props) {
    const inputRef = useRef(null);

    useEffect(() => {
        const tagify = new Tagify(inputRef.current, {
            enforceWhitelist: false,
            value: props.initialKeywords
        });

        tagify.addTags(props.initialKeywords);

        tagify.on('add', (e) => {
            props.setKeywords((prevKeywords) => [...prevKeywords, e.detail.data.value]);
        });

        tagify.on('remove', (e) => {
            const removedKeyword = e.detail.data.value;
            // Remove the tag from the state (props.cosupervisors)
            props.setKeywords((prevKeywords) =>
                prevKeywords.filter((tag) => tag !== removedKeyword)
            );
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
}


