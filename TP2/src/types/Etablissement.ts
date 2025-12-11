export interface Etablissement {
	id?: number;
	codeImm: number;
	nom: string;
	prescolaire: boolean;
	primaire: boolean;
	secondaire: boolean;
	professionnel: boolean;
	adulte: boolean;
	type: string;
	coordonnee_id: number;
	ide_id: number;
	regroupement_id: number;
	codeOrg: number;
}