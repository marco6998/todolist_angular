export interface CustomAlert {
	title?: string;
	body: string;
	cancelButton?: boolean; //esta propiedad es ara indicar si va a existir el botn de cancelar
	cancelButtonText?: string; //este es para definir el textp ue va a tener el boton
	acceptButtonText?: string; //boton de cancelar
	type?: 'success' | 'error';
}