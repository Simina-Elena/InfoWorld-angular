export interface Patient {
  firstName: string,
  lastName: string,
  birthdate: string,
  gender: gender,
  CNP: number,
  phoneNumber: string,
  orderNumber: number
}

enum gender{
  M = 'Male',
  F = 'Female'
}
