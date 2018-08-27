
export function initializeState() {
	return {
		isLoading: true,
		hasErrored: false,
		errorMessage: '',
		appMode: 'registry',
		registry: [],
		recordInit: { 
			name: '',
			value1: '',
			value2: '',
			value3: '',
			value4: '',
		},
		record: {
			name: 'asdf',
			value1: '',
			value2: '',
			value3: '',
			value4: '',
		},
	}
}
