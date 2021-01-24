/* eslint-disable no-tabs */

export interface Breed {
	id: string
	name: string
}

export interface Cat {
	id: string
	url: string
}

export interface HomeState {
  breedList: Breed
  catList: Cat
  page: number
  selectedBreed: string
  loadLabel: string
  isDisableLoad: boolean
  hideLoadBtn: boolean
}
