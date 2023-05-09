import { ReportSharp } from "@mui/icons-material";
import { axiosApi } from "./api-interceptor";


const createJournal = async(JournalData)=>{
    try{
        const response = await axiosApi.post('/journal', JournalData);
        return response;
    }catch(e){
        return e;
    }
}

const getJournal = async(userId)=>{
    try {
        const response = await axiosApi.get(`/journal/${userId}`)
        return response;
    } catch (e) {
        return e
    }
}

const deleteJournal = async(journalId)=>{
    try{
        const response = await axiosApi.delete(`/journal/${journalId}`)
        return response
    }catch(e){
        return e;
    }
}

export { createJournal,getJournal,deleteJournal }