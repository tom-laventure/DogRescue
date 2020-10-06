const setFormTemplateUser = () => {
    let ro = true;
    let tempState = [
        {
            type: "Text",
            label: "Status",
            placeholder: "",
            readOnly: ro
        },
        {
            type: "Text",
            label: "Adopters",
            placeholder: "",
            readOnly: ro
        },
        {
            type: "Text",
            label: "Handler",
            placeholder: "",
            readOnly: true
        },
        {
            type: "Date",
            label: "Inbound Date",
            placeholder: "",
            readOnly: ro
        },
        {
            type: "Text",
            label: "Flight Details",
            placeholder: "",
            readOnly: ro
        }
    ]
    return tempState
}
const setFormTemplateHandler = (formInfo, setFormInfo) => {
    let ro = false;
    let tempState = [
        {
            type: "DropDown",
            options: ["Awaiting Arrival", "Searching for Flight Volunteer"],
            label: "Status",
            select: () => {
            },
            placeholder: "",
            readOnly: false
        },
        {
            type: "Text",
            label: "Adopters",
            placeholder: "",
            readOnly: true
        },
        {
            type: "DropDown",
            options: ["Jenny", "Tim", "Sam"],
            label: "Handler",
            select: () => {
            },
            placeholder: "",
            readOnly: ro
        },
        {
            type: "Date",
            label: "Inbound Date",
            placeholder: "",
            readOnly: ro
        },
        {
            type: "Text",
            label: "Flight Details",
            placeholder: "",
            readOnly: ro
        }
    ]
    return tempState
}

export {setFormTemplateUser, setFormTemplateHandler}