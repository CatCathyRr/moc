import { http } from '@/utils/request';

/**
 * 账号密码登录
 * @returns UseAxiosReturn
 */
export function loginPassword() {
  return http.post(`/api/login`, {
    data: { name: '123' },
  });
}

export function IndexData() {
  return http.get(`/api/list-ovens`, {
    params: { site: 'VCTZ', shop: 'LQB' },
    headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZHNpZCI6IlpUQU5HMjYiLCJ0YWdzIjoiTU9DX0FQUF8iLCJleHBpcmVfdGltZSI6IjIwMjQtMDEtMjcgMDI6MjI6MjUifQ.axgRtRzdaqyw_6S-N9k8i8U3ZggSaVTG1ENoXxWjFBU' },
  });
  
}

export function CurrentPlan(data) { 
  return http.get(`/api/current-plan`, {
    params: data,
    headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZHNpZCI6IlpUQU5HMjYiLCJ0YWdzIjoiTU9DX0FQUF8iLCJleHBpcmVfdGltZSI6IjIwMjQtMDEtMjcgMDI6MjI6MjUifQ.axgRtRzdaqyw_6S-N9k8i8U3ZggSaVTG1ENoXxWjFBU' },
  });
}



export function CurrentPredict(data) {
  return http.get(`/api/current-prediction`, {
    params: data,
    headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZHNpZCI6IlpUQU5HMjYiLCJ0YWdzIjoiTU9DX0FQUF8iLCJleHBpcmVfdGltZSI6IjIwMjQtMDEtMjcgMDI6MjI6MjUifQ.axgRtRzdaqyw_6S-N9k8i8U3ZggSaVTG1ENoXxWjFBU' },
  });
}

export function Faultdata() {
  return http.get(`/api/feedback/list-fault-types`, {
    headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZHNpZCI6IlpUQU5HMjYiLCJ0YWdzIjoiTU9DX0FQUF8iLCJleHBpcmVfdGltZSI6IjIwMjQtMDEtMjcgMDI6MjI6MjUifQ.axgRtRzdaqyw_6S-N9k8i8U3ZggSaVTG1ENoXxWjFBU' },
  });  
}

export function ADDfeedback(data) {
  return http.post(`/api/feedback/current-feedback`, 
    data,
    {headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZHNpZCI6IlpUQU5HMjYiLCJ0YWdzIjoiTU9DX0FQUF8iLCJleHBpcmVfdGltZSI6IjIwMjQtMDEtMjcgMDI6MjI6MjUifQ.axgRtRzdaqyw_6S-N9k8i8U3ZggSaVTG1ENoXxWjFBU' }},
  );
}



export function GETfeedback(data) {
  return http.get(`/api/feedback/current-feedback`, {
    params: data,
    headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZHNpZCI6IlpUQU5HMjYiLCJ0YWdzIjoiTU9DX0FQUF8iLCJleHBpcmVfdGltZSI6IjIwMjQtMDEtMjcgMDI6MjI6MjUifQ.axgRtRzdaqyw_6S-N9k8i8U3ZggSaVTG1ENoXxWjFBU' },
  });
}

export function PlanData(params) {
  return http.get(`/api/production-plan`, {
    params: params,
    headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZHNpZCI6IlpUQU5HMjYiLCJ0YWdzIjoiTU9DX0FQUF8iLCJleHBpcmVfdGltZSI6IjIwMjQtMDEtMjcgMDI6MjI6MjUifQ.axgRtRzdaqyw_6S-N9k8i8U3ZggSaVTG1ENoXxWjFBU' },
  });
}

export function AddPlanData(data) {
  return http.put(`/api/production-plan`, 
    data,
    {headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZHNpZCI6IlpUQU5HMjYiLCJ0YWdzIjoiTU9DX0FQUF8iLCJleHBpcmVfdGltZSI6IjIwMjQtMDEtMjcgMDI6MjI6MjUifQ.axgRtRzdaqyw_6S-N9k8i8U3ZggSaVTG1ENoXxWjFBU' },
});
}

export function PostPlanData(data) {
  return http.post(`/api/production-plan`, 
    data,
    {headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZHNpZCI6IlpUQU5HMjYiLCJ0YWdzIjoiTU9DX0FQUF8iLCJleHBpcmVfdGltZSI6IjIwMjQtMDEtMjcgMDI6MjI6MjUifQ.axgRtRzdaqyw_6S-N9k8i8U3ZggSaVTG1ENoXxWjFBU' },
  });
}

export function DeletePlanData(data) {
  return http.delete(`/api/production-plan`, {
    params: data,
    headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZHNpZCI6IlpUQU5HMjYiLCJ0YWdzIjoiTU9DX0FQUF8iLCJleHBpcmVfdGltZSI6IjIwMjQtMDEtMjcgMDI6MjI6MjUifQ.axgRtRzdaqyw_6S-N9k8i8U3ZggSaVTG1ENoXxWjFBU' },
  });
}