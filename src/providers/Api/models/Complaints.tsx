export interface Complaints{

    id: string
    "date_of_refusal": string
    "operating_time": string
    "failure_node": string
    "failure_description": string
    "recovery_method": string
    "parts_used": string
    "date_of_restoration": string
    "equipment_downtime": string
    "machine": string
    'select_data': {
            'machine': object
            'failure_node': object
            'recovery_method': object
        }

}