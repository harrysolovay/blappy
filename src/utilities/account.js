import {
  isSignInPending,
  isUserSignedIn,
  handlePendingSignIn,
  loadUserData,
  putFile,
  getFile,
} from 'blockstack'

export const withAuth = async callback => {
  if (isSignInPending()) {
    try {
      const user = await handlePendingSignIn()
      callback(user)
    } catch (error) {
      console.error(`handlePendingSignIn call error, ${error}`)
    }
  } else {
    if (isUserSignedIn()) {
      callback(loadUserData())
    } else {
      callback(false)
    }
  }
}

export const saveBoard = (boardId, contents, callback) => {
  putFile(`${boardId}.json`, JSON.stringify(contents)).then(callback)
}

export const withBoard = (boardId, callback) => {
  return getFile(`${boardId}.json`).then(file => {
    callback(JSON.parse(file))
  })
}

export const withBoards = callback => {
  getFile('BLAPPY_BOARDS.json').then(file => {
    callback(JSON.parse(file))
  })
}
