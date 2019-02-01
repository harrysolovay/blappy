import {IBoards, IBoard} from './@types/storage'

export const boards: IBoards = [
  {
    id: '9JqHr2bHt',
    title: 'board1',
    description: 'some description about board 1',
    edited: new Date(),
  },
  {
    id: 'board2',
    title: 'board2',
    description: 'some description about board 2',
    edited: new Date(),
  },
  {
    id: 'board3',
    title: 'board3',
    description: 'some description about board 3',
    edited: new Date(),
  },
  {
    id: 'board4',
    title: 'board4',
    description: 'some description about board 4',
    edited: new Date(),
  },
  {
    id: 'board5',
    title: 'board5',
    description: 'some description about board 5',
    edited: new Date(),
  },
  {
    id: 'board6',
    title: 'board6',
    description: 'some description about board 6',
    edited: new Date(),
  },
  {
    id: 'board7',
    title: 'board7',
    description: 'some description about board 7',
    edited: new Date(),
  },
  {
    id: 'board8',
    title: 'board8',
    description: 'some description about board 8',
    edited: new Date(),
  },
  {
    id: 'board9',
    title: 'board9',
    description: 'some description about board 9',
    edited: new Date(),
  },
  {
    id: '9JqHr2bHt',
    title: 'board1',
    description: 'some description about board 1',
    edited: new Date(),
  },
  {
    id: 'board2',
    title: 'board2',
    description: 'some description about board 2',
    edited: new Date(),
  },
  {
    id: 'board3',
    title: 'board3',
    description: 'some description about board 3',
    edited: new Date(),
  },
  {
    id: 'board4',
    title: 'board4',
    description: 'some description about board 4',
    edited: new Date(),
  },
  {
    id: 'board5',
    title: 'board5',
    description: 'some description about board 5',
    edited: new Date(),
  },
  {
    id: 'board6',
    title: 'board6',
    description: 'some description about board 6',
    edited: new Date(),
  },
  {
    id: 'board7',
    title: 'board7',
    description: 'some description about board 7',
    edited: new Date(),
  },
  {
    id: 'board8',
    title: 'board8',
    description: 'some description about board 8',
    edited: new Date(),
  },
  {
    id: 'board9',
    title: 'board9',
    description: 'some description about board 9',
    edited: new Date(),
  },
]

export const board: IBoard = {
  id: '9JqHr2bHt',
  title: 'Tech board',
  description: 'some description',
  edited: new Date(),
  lanes: [
    {
      id: 'lane1',
      title: 'Hardware',
      cards: [
        {
          id: 'Card1',
          url: 'https://www.apple.com/',
          notes: 'Macbook Pro is Sweeet',
        },
        {
          id: 'Card2',
          url: 'https://www.google.com/chromebook',
          notes: 'Chromebook is not so sweeet',
        },
      ],
    },
    {
      id: 'lane2',
      title: 'Cloud',
      cards: [
        {
          id: 'Card3',
          url: 'https://aws.amazon.com/',
          notes: '... they have decent services I suppose ;)',
        },
        {
          id: 'Card4',
          url: 'https://blockstack.org',
          notes: 'The next big thing',
        },
      ],
    },
    {
      id: 'lane3',
      title: 'Dev Tools',
      cards: [
        {
          id: 'Card5',
          url: 'https://babeljs.io',
          notes: 'Cool transpiler',
        },
        {
          id: 'Card6',
          url: 'https://reactjs.org',
          notes: 'This site is built with React!',
        },
      ],
    },
  ],
}
