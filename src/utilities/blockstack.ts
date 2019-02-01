import {
  isSignInPending,
  handlePendingSignIn,
  isUserSignedIn,
  loadUserData,
  putFile,
  getFile,
} from 'blockstack'

export async function getCurrentUser(): Promise<any> {
  if (isSignInPending()) {
    try {
      return await handlePendingSignIn()
    } catch (error) {
      console.error(error)
      return null
    }
  } else {
    if (isUserSignedIn()) {
      return loadUserData()
    } else {
      return null
    }
  }
}

export async function onBoardDataChange(data: any) {
  console.log(data)
}
