import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {Token} from "./models/Token";
// import {Patch} from "../StoreProvider/models/Patch";


export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl:"http://127.0.0.1:8000",
        timeout: 2000
    }),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        loginApi: build.mutation<Token, Token>({
            query: ({ username, password }) => ({
                url:`/users/api-token/`,
                method: 'POST',
                body: {
                    'username': username,
                    'password': password
                },
                // headers: {
                //     'Content-Type': 'application/json',
                //     'Accept': 'application/json'
                // }
            }),
            invalidatesTags: ['Post']
        }),
        // companyCount: build.query({
        //     query:(arg)=>({
        //         url: `/account/info` ,
        //         headers: {
        //             authorization: `Bearer ${localStorage.getItem('accessToken')}`
        //         }
        //
        // }),
        //     providesTags: result => ["Post"]
        // }),
        // objectSearch: build.mutation<Patch, Patch>({
        //     query: ({patch,
        //                 inn,
        //                 limit,
        //                 startDate,
        //                 endDate,
        //                 tonality,
        //                 maxFullness,
        //                 inBusinessNews,
        //                 onlyMainRole,
        //                 onlyWithRiskFactors,
        //                 excludeTechNews,
        //                 excludeAnnouncements,
        //                 excludeDigests
        //             }) =>({
        //         url:`${patch}`,
        //         method: 'POST',
        //         body:{
        //
        //       "issueDateInterval": {
        //         "startDate": `${startDate}T00:00:00+03:00`,
        //         "endDate": `${endDate}T23:59:59+03:00`
        //       },
        //       "searchContext": {
        //         "targetSearchEntitiesContext": {
        //           "targetSearchEntities": [
        //             {
        //               "type": "company",
        //               "sparkId": null,
        //               "entityId": null,
        //               "inn": `${inn}`, //7710137066,
        //               "maxFullness": `${maxFullness}`,
        //               "inBusinessNews": `${inBusinessNews}`
        //             }
        //           ],
        //           "onlyMainRole": `${onlyMainRole}`,
        //           "tonality": `${tonality}`,
        //           "onlyWithRiskFactors": onlyWithRiskFactors,
        //           "riskFactors": {
        //             "and": [],
        //             "or": [],
        //             "not": []
        //           },
        //           "themes": {
        //             "and": [],
        //             "or": [],
        //             "not": []
        //           }
        //         },
        //         "themesFilter": {
        //           "and": [],
        //           "or": [],
        //           "not": []
        //         }
        //       },
        //       "searchArea": {
        //         "includedSources": [],
        //         "excludedSources": [],
        //         "includedSourceGroups": [],
        //         "excludedSourceGroups": []
        //       },
        //       "attributeFilters": {
        //         "excludeTechNews": `${excludeTechNews}`,
        //         "excludeAnnouncements": `${excludeAnnouncements}`,
        //         "excludeDigests": `${excludeDigests}`
        //       },
        //       "similarMode": "duplicates",
        //       "limit": `${limit}`,
        //       "sortType": "sourceInfluence",
        //       "sortDirectionType": "desc",
        //       "intervalType": "month",
        //       "histogramTypes": [
        //         "totalDocuments",
        //         "riskFactors"
        //       ]
        //
        //         },
        //         headers:{
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json',
        //             authorization: `Bearer ${localStorage.getItem('accessToken')}`
        //
        //         }
        //     }),
        //     invalidatesTags: ['Post']
        // }),
        // documents: build.mutation({
        //     query: ({}) => ({
        //         url:"/documents",
        //         method: "POST",
        //         body:{
        //             "ids": [ "1:0JPQqdGM0JNWCdCzf2Jt0LHQotGV0ZUh0ZbRlBXCt0Je0JHQruKAnDcUXkZQ0YvQscKnehLRnNC1KtGK0Ll9BWLigLo/HXXCrhw="]
        //         },
        //         headers:{
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json',
        //             authorization: `Bearer ${localStorage.getItem('accessToken')}`
        //         }
        //     }),
        //     invalidatesTags: ['Post']
        // })
})
})