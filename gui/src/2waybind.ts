export default function bind(state: string, setState: (state: string) => void) {
	return { value: state, onChange: (e: any) => setState(e.target.value) };
}
