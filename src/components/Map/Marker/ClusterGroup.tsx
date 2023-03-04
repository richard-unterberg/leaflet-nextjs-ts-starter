import {
  LeafletContextInterface,
  createElementObject,
  createPathComponent,
  extendContext,
} from '@react-leaflet/core'
import Leaflet, { LeafletMouseEventHandlerFn } from 'leaflet'
import 'leaflet.markercluster'
import { Maximize2 } from 'lucide-react'
import React from 'react'

import { AppConfig } from '@lib/AppConfig'

import useLeafletDivIcon from '../useLeafletDivIcon'
import MarkerIconWrapper from './MarkerIconWrapper'

type ClusterEvents = {
  onClick?: LeafletMouseEventHandlerFn
  onDblClick?: LeafletMouseEventHandlerFn
  onMouseDown?: LeafletMouseEventHandlerFn
  onMouseUp?: LeafletMouseEventHandlerFn
  onMouseOver?: LeafletMouseEventHandlerFn
  onMouseOut?: LeafletMouseEventHandlerFn
  onContextMenu?: LeafletMouseEventHandlerFn
}

type MarkerClusterControl = Leaflet.MarkerClusterGroupOptions & {
  children: React.ReactNode
  color: string
} & ClusterEvents

const CreateMarkerClusterGroup = (props: MarkerClusterControl, context: LeafletContextInterface) => {
  const { divIcon } = useLeafletDivIcon()

  const markerClusterGroup = new Leaflet.MarkerClusterGroup({
    iconCreateFunction: () =>
      divIcon({
        source: <MarkerIconWrapper color={props.color} icon={Maximize2} />,
        anchor: [AppConfig.ui.markerIconSize / 2, AppConfig.ui.markerIconSize / 2],
      }),
    animateAddingMarkers: true,
    ...props,
  })

  return createElementObject(
    markerClusterGroup,
    extendContext(context, { layerContainer: markerClusterGroup }),
  )
}

export const MarkerClusterGroup = () =>
  createPathComponent<Leaflet.MarkerClusterGroup, MarkerClusterControl>(CreateMarkerClusterGroup)
