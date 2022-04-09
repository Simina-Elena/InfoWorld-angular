export interface Patient {
  key: string
  firstName: string
  lastName: string
  birthdate: string
  gender: gender
  CNP: string
  phoneNumber: string
  orderNumber: number
}

export enum gender{
  M = 'Male',
  F = 'Female'
}
