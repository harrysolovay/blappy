import React, {Dispatch, SetStateAction, ComponentType, useState} from 'react'
import {RouteComponentProps, Redirect} from 'react-router-dom'
import styled from 'styled-components'

type AsPageProps = {
  redirect: Dispatch<SetStateAction<string | null>>
}
type RouterProps = RouteComponentProps<{id: string}>
type Props = AsPageProps & RouterProps

const HeaderGhost = styled.div`
  width: 100%;
  height: 60px;
`

export default function(Component: ComponentType<Props>, noGhost?: boolean) {
  return (props: any) => {
    const [to, redirect] = useState(null as string | null)
    return to ? (
      <Redirect push {...{to}} />
    ) : (
      <>
        {!noGhost && <HeaderGhost />}
        <Component {...props} {...{redirect}} />
      </>
    )
  }
}
