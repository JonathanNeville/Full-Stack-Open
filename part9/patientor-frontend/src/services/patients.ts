import axios from "axios";
import { Entry, NewEntry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getPatientById = async (id: string) => {
  const patient = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  )
  
  return patient
} 

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const postEntry = async (entry: NewEntry, patientId: string) => {
  const {data} = await axios.post<Patient>(`${apiBaseUrl}/patients/${patientId}/entries`,
  entry);
  return data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create, getPatientById, postEntry
};

