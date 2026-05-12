export type ServiceType = "website" | "motion";

export interface FormState {
  step: number;              // 0 = ServiceSelector, 1-6 = form steps
  serviceType: ServiceType | null;

  // Step 1 (common)
  domeniu: string;

  // Website — Step 2
  areWebsite: boolean | null;
  websiteLink: string;

  // Website — Step 3 (multi-select)
  scopuri: string[];

  // Website — Step 4
  stilWebsite: string;

  // Website — Step 5
  buget: string;

  // Motion — Step 2 (multi-select)
  scopVideo: string[];
  altcevaScop: string;

  // Motion — Step 3
  footageExistent: "da" | "nu" | "nu_stiu" | "";
  footageLink: string;

  // Motion — Step 4
  vibe: string;

  // Motion — Step 5
  areCulori: "da" | "nu" | "";
  culoriText: string;

  // Step 6 (common — contact)
  numeAfacere: string;
  nume: string;
  email: string;
  whatsapp: string;
}

export const INITIAL_STATE: FormState = {
  step: 0,
  serviceType: null,
  domeniu: "",
  areWebsite: null,
  websiteLink: "",
  scopuri: [],
  stilWebsite: "",
  buget: "",
  scopVideo: [],
  altcevaScop: "",
  footageExistent: "",
  footageLink: "",
  vibe: "",
  areCulori: "",
  culoriText: "",
  numeAfacere: "",
  nume: "",
  email: "",
  whatsapp: "",
};

export type FormAction =
  | { type: "set"; field: keyof FormState; value: any }
  | { type: "toggleMulti"; field: "scopuri" | "scopVideo"; value: string }
  | { type: "selectService"; service: ServiceType }
  | { type: "next" }
  | { type: "prev" };

export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "set":
      return { ...state, [action.field]: action.value };
    case "toggleMulti": {
      const arr = state[action.field] as string[];
      const exists = arr.includes(action.value);
      return {
        ...state,
        [action.field]: exists ? arr.filter((v) => v !== action.value) : [...arr, action.value],
      };
    }
    case "selectService":
      return { ...state, serviceType: action.service, step: 1 };
    case "next":
      return { ...state, step: Math.min(6, state.step + 1) };
    case "prev":
      return { ...state, step: Math.max(0, state.step - 1) };
    default:
      return state;
  }
}

export function isStepValid(state: FormState): boolean {
  const { step, serviceType } = state;
  if (step === 0) return serviceType !== null;
  switch (step) {
    case 1:
      return state.domeniu.trim().length > 1;
    case 2:
      if (serviceType === "website") return state.areWebsite !== null;
      return state.scopVideo.length > 0;
    case 3:
      if (serviceType === "website") return state.scopuri.length > 0;
      if (state.footageExistent === "") return false;
      if (state.footageExistent === "da") return state.footageLink.trim().length > 0;
      return true;
    case 4:
      if (serviceType === "website") return state.stilWebsite !== "";
      return state.vibe !== "";
    case 5:
      if (serviceType === "website") return state.buget !== "";
      if (state.areCulori === "") return false;
      if (state.areCulori === "da") return state.culoriText.trim().length > 0;
      return true;
    case 6:
      return (
        state.numeAfacere.trim().length > 1 &&
        state.nume.trim().length > 1 &&
        (state.email.trim().length > 0 || state.whatsapp.trim().length > 0)
      );
    default:
      return false;
  }
}
