import { LatLngExpression } from 'leaflet'

import { Category } from './MarkerCategories'

interface PlaceValues {
  position: LatLngExpression
  category: Category
}
export type PlacesType = PlaceValues[]

export const Places: PlacesType = [
  {
    position: [52.051977014580125, 8.531494086782844],
    category: Category.CAT1,
  },
  {
    position: [52.02022592597971, 8.530780645829076],
    category: Category.CAT1,
  },
  {
    position: [52.022468698328275, 8.50583167463131],
    category: Category.CAT1,
  },
  {
    position: [51.99739839338658, 8.59544834428681],
    category: Category.CAT1,
  },
  {
    position: [52.01219274931668, 8.599568218099812],
    category: Category.CAT2,
  },
  {
    position: [52.0119, 8.563032],
    category: Category.CAT2,
  },
  {
    position: [52.02022192326546, 8.583775371420124],
    category: Category.CAT2,
  },
  {
    position: [51.99494772863581, 8.560429425686753],
    category: Category.CAT2,
  },
  {
    position: [51.99274772863586, 8.560429425686753],
    category: Category.CAT2,
  },
]
