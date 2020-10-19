const setFormTemplateUser = () => {
    let ro = true;
    let tempState = [
        {
            type: "Text",
            label: "Status",
            value: "",
            readOnly: ro
        },
        {
            type: "Text",
            label: "Adopters",
            value: "",
            readOnly: ro
        },
        {
            type: "Text",
            label: "Handler",
            value: "",
            readOnly: true
        },
        {
            type: "Date",
            label: "Inbound Date",
            value: "",
            readOnly: ro
        },
        {
            type: "Text",
            label: "Flight Details",
            value: "",
            readOnly: ro
        }
    ]
    return tempState
}
const setFormTemplateHandler = (formInfo) => {
    let ro = false;
    let tempState = [
        {
            type: "DropDown",
            options: ["Awaiting Arrival", "Searching for Flight Volunteer"],
            label: "Status",
            select: () => {
            },
            value: "",
            readOnly: false,
            placeholder: 'Status'
        },
        {
            type: "Text",
            label: "Adopters",
            value: "",
            readOnly: true
        },
        {
            type: "DropDown",
            options: ["Jenny", "Tim", "Sam"],
            label: "Handler",
            select: () => {
            },
            value: "",
            readOnly: ro,
            placeholder: 'Handler'
        },
        {
            type: "Date",
            label: "Inbound Date",
            value: "",
            readOnly: ro
        },
        {
            type: "Text",
            label: "Flight Details",
            value: "",
            readOnly: ro
        }
    ]
    return tempState
}

export {setFormTemplateUser, setFormTemplateHandler}