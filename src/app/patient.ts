export class Patient {
  firstName: string | undefined
  lastName: string | undefined
  birthdate: string | undefined
  gender: gender | undefined
  CNP?: string
  phoneNumber?: string
  orderNumber?: number
}

export enum gender{
  M = 'Male',
  F = 'Female'
}
