export interface Maintenance{
        "id": number
        "type_of_maintenance": string
        "date_of_maintenance": string
        "operating_time": string
        "order_number": string
        "order_date": string
        "machine":string
        "select_data":{
            "machine": object
            "type_maintenance" :object
}

}