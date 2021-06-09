import {CalcGear} from "@/modules/Calc";

const VuexCalculadora = {

    state: {
        type: 1,
        pinhao: {
            N1: 13.00,
            dp: 0.0,
            de: 0.00,
            di: 0.00,
            db: 0.00,
            r: 0.00,
            a: 0.00,
            b: 0.00,
            ht: 0.00,
            c: 0.00,
            t: 0.00,
            v: 0.00,
            pc: 0.00,
            pb: 0.00,
            pd: 0.00,
        },
        engrenagem: {
            N1: 16.0,
            dp: 0.00,
            de: 0.00,
            di: 0.00,
            db: 0.00,
            r: 0.00,
            a: 0.00,
            b: 0.00,
            ht: 0.00,
            c: 0.00,
            t: 0.00,
            v: 0.00,
            pc: 0.00,
            pb: 0.00,
            pd: 0.00,
        },
        entradas: {
            mV: 0.0,
            mA: 0.0,
            mG: 0.0,
            phi: 20,
            M: 4,
            u: 10.0,
            CE: 0.0,
            Cn: 0.0,
            Z: 0.0,
            phiN: 0.0,
            F: 0.0,
            Mp: 0.0,
        },
        tensoes: {
            p: 0,
            pw: 0,
            rpm: 0,
            tp: 0,
            tg: 0,
            wr: 0,
            wt: 0,
            vt: 0,
            wa: 0,
            w: 0,
            kv: 0.0,
        },
        anatensoes: {
            ab: 0.0,
            ab2: 0.0,
            j: "",
            qv: '',
            j2: "",
            ka: 0.0,
            kb: 1,
            kb2: 1,
            kvS: 0,
            ki: 0.0,
            km: 0.0,
            ks: 1,
            tr: 0.0,
            tr2: 0.0,
            kv: 0.0,
        },
        anatensoes2: {
            i: 0.0,
            Cp: 0.0,
            Cf: 1.0,
            Ca: 0.0,
            Cm: 0.0,
            Cv: 0.0,
            Cs: 0.0,
            Sfb1: 0.0,
            Sfb2: 0.0,
            Sfc1: 0.0,
            Sfc2: 0.0,
            Hb: 0.0,
            Hbc: 0.0,
            FT: 0.0,
            Kt: 0.0,
            Kl: 0.0,
            CL: 0.0,
            Sfb:0.0,
            Sfc:0.0,
            Ch:1,
            NBp:0.0,
            NBe:0.0,
            NCp:0.0,
            NCe:0.0,
            Nc:0.0,
            ac1:0.0,
            ac2:0.0,
        },
        Abs: {
            MM: 0.0,
            CO: 0.0,
            App: 0.0,
            EM: 1,
            Ru: 0.0,
            AP: 0,
            AP2: 0,
            type: 0.0,
            CR: "",
            PD: "",
            Cp: "",
            Cp2: "",
            Application: '',
            TO: 1,
            TOS:1,
            NC: 0,
            NCS: 0,
            CF: 0,
            GR:0,
            GR2:0,
        },
    },
    getters: {
        pinhao: state => state.pinhao,
        engrenagem: state => state.engrenagem,
        entradas: state => state.entradas,
        tensoes: state => state.tensoes,
        anatensoes: state => state.anatensoes,
        Abs: state => state.Abs,
        anatensoes2: state => state.anatensoes2,
        type: state => state.type,
    },
    mutations: {
        ChangePinhao: (state, field, number) => {
            const Inserido = state.pinhao[field];
            let Pinhao = CalcGear.CalcPinhao(field, state.pinhao[field]);

            if (number) {
                Pinhao = CalcGear.CalcPinhao(field, 50);
            }

            Object.keys(state.pinhao).forEach(value => {
                state.pinhao[value] = Pinhao[value];
            });

            if (field == 'N1') {
                if (CalcGear.RoundDentesPinhao(state.engrenagem.N1 / state.pinhao.N1) > Inserido) {
                    const Pinhao = CalcGear.CalcPinhao('N1', CalcGear.RoundDentesPinhao(state.engrenagem.N1 / state.pinhao.N1));
                    Object.keys(state.pinhao).forEach(value => {
                        state.pinhao[value] = Pinhao[value];
                    });
                }

                const Entradas = CalcGear.CalcEntradas('mG', state.engrenagem.N1 / state.pinhao.N1);
                Object.keys(state.entradas).forEach(value => {
                    state.entradas[value] = Entradas[value];
                });
            }
        },
        ChangeEngrenagem: (state, field, number) => {

            if (field == 'dp') {

                if (parseFloat(state.engrenagem.dp) < parseFloat(state.pinhao.dp)) {
                    state.engrenagem.dp = state.pinhao.dp;
                }
            }

            let Engrenagem = CalcGear.CalcEngrenagem(field, state.engrenagem[field]);


            if (number) {
                Engrenagem = CalcGear.CalcEngrenagem(field, number);
            }

            Object.keys(state.engrenagem).forEach(value => {
                state.engrenagem[value] = Engrenagem[value];
            });

            if (field == 'N1') {
                if (state.engrenagem.N1 < state.pinhao.N1) state.engrenagem.N1 = state.pinhao.N1;
                if (CalcGear.RoundDentesPinhao(state.engrenagem.N1 / state.pinhao.N1) > state.pinhao.N1) {
                    const Pinhao = CalcGear.CalcPinhao('N1', CalcGear.RoundDentesPinhao(state.engrenagem.N1 / state.pinhao.N1));
                    Object.keys(state.pinhao).forEach(value => {
                        state.pinhao[value] = Pinhao[value];
                    });
                }

                const Entradas = CalcGear.CalcEntradas();
                Object.keys(state.entradas).forEach(value => {
                    state.entradas[value] = Entradas[value];
                });
            }
        },
        ChangeEntradas: (state, field, number) => {
            let Entradas = CalcGear.CalcEntradas(field, state.entradas[field]);

            if (number) {
                Entradas = CalcGear.CalcEntradas(field, number);
            }
            Object.keys(state.entradas).forEach(value => {
                state.entradas[value] = Entradas[value];
                if (value == 'F') {
                    state.anatensoes.km = CalcGear.Km();
                }

                if (value == 'Mp') {
                    if (state.anatensoes.Mp >= 1.2) {
                        state.Abs.CR = "HPSTC";
                    } else {
                        state.Abs.CR = "CARR. PONTA DO DENTE";
                    }
                }
            });
        },
        ChangeMG: (state, number) => {
            state.pinhao.N1 = CalcGear.RoundDentesPinhao(number);

            const Pinhao = CalcGear.CalcPinhao('N1', state.pinhao.N1);

            Object.keys(state.pinhao).forEach(value => {
                state.pinhao[value] = Pinhao[value];
            });

            state.engrenagem.N1 = Math.round(state.pinhao.N1 * number);

            const Engrenagem = CalcGear.CalcEngrenagem('N1', state.engrenagem.N1);

            Object.keys(state.engrenagem).forEach(value => {
                state.engrenagem[value] = Engrenagem[value];
            });


            const Entradas = CalcGear.CalcEntradas();

            Object.keys(state.entradas).forEach(value => {
                state.entradas[value] = Entradas[value];
                if (value == 'F') {
                    console.log('Km', CalcGear.Km());
                    state.anatensoes.km = CalcGear.Km();
                }

                if (value == 'Mp') {
                    if (state.anatensoes.Mp >= 1.2) {
                        state.Abs.CR = "HPSTC";
                    } else {
                        state.Abs.CR = "CARR. PONTA DO DENTE";
                    }
                }
            });
        },
        ChangeM: (state, number) => {
            const Entradas = CalcGear.CalcEntradas('M', number);

            Object.keys(state.entradas).forEach(value => {
                state.entradas[value] = Entradas[value];
                if (value == 'F') {
                    state.anatensoes.km = CalcGear.Km();
                }

                if (value == 'Mp') {
                    if (state.anatensoes.Mp >= 1.2) {
                        state.Abs.CR = "HPSTC";
                    } else {
                        state.Abs.CR = "CARR. PONTA DO DENTE";
                    }
                }
            });

            const Pinhao = CalcGear.CalcPinhao('N1', state.pinhao.N1);
            Object.keys(state.pinhao).forEach(value => {
                state.pinhao[value] = Pinhao[value];
            });

            const Engrenagem = CalcGear.CalcEngrenagem('N1', state.engrenagem.N1);
            Object.keys(state.engrenagem).forEach(value => {
                state.engrenagem[value] = Engrenagem[value];
            });

            if (state.anatensoes.j && state.entradas.F && state.tensoes.wt && state.anatensoes.ka && state.anatensoes.kv && state.anatensoes.km && state.anatensoes.ks && state.anatensoes.kb && state.anatensoes.ki) {
                state.anatensoes.ab = (parseFloat(state.tensoes.wt) / (parseFloat(state.entradas.F) * parseFloat(state.entradas.M) * parseFloat(state.anatensoes.j)))
                    * (parseFloat(state.anatensoes.ka) * parseFloat(state.anatensoes.km) / parseFloat(state.anatensoes.kv))
                    * parseFloat(state.anatensoes.ks) * parseFloat(state.anatensoes.kb) * parseFloat(state.anatensoes.ki);
            }
        },
        ChangePhi: (state, number) => {
            const Entradas = CalcGear.CalcEntradas('phi', number);

            Object.keys(state.entradas).forEach(value => {
                state.entradas[value] = Entradas[value];
            });

            const Pinhao = CalcGear.CalcPinhao('N1', state.pinhao.N1);
            Object.keys(state.pinhao).forEach(value => {
                state.pinhao[value] = Pinhao[value];
            });

            const Engrenagem = CalcGear.CalcEngrenagem('N1', state.engrenagem.N1);
            Object.keys(state.engrenagem).forEach(value => {
                state.engrenagem[value] = Engrenagem[value];
            });
        },
        ChangeCn: (state, number) => {
            const Entradas = CalcGear.CalcEntradas('Cn', number);

            if (number <= Entradas.CE) {
                state.entradas['Cn'] = Entradas.CE;
                Entradas.Cn = Entradas.CE;
                state.entradas['phiN'] = state.entradas.phi;
            } else {
                if (number > Entradas.CE * 1.03) {
                    state.entradas['Cn'] = (Entradas.CE * 1.03).toFixed(3);
                    Entradas.Cn = Entradas.CE * 1.03;
                }

                let phiN = Math.cos(Entradas.phi * (Math.PI / 180)) / (Entradas.Cn / Entradas.CE);
                phiN = Math.acos(phiN) * (180 / Math.PI);
                Entradas.phiN = phiN.toFixed(3);
                state.entradas['phiN'] = Entradas['phiN'];
            }
        },
        ChangeHPState: (state, number) => {
            state.tensoes.pw = 745.7 * parseFloat(number);
        },
        ChangeType: (state, number) => {
            state.type = number;
        },
        ChangePWState: (state, number) => {
            state.tensoes.p = parseFloat(number) / 745.7;
        },
        ChangeRPM: (state, number) => {
            state.tensoes.rpm = number;
            state.tensoes.tp = (state.tensoes.pw / (number * 2 * Math.PI / 60)).toFixed(3);
            state.tensoes.tg = (state.tensoes.pw / (number * 2 * Math.PI / 60) * state.entradas.mG).toFixed(3);

            state.tensoes.wt = (state.tensoes.tp / (state.pinhao.dp / 2000)).toFixed(3);
            state.tensoes.wr = (state.tensoes.wt * Math.tan(state.entradas.phi * (Math.PI / 180))).toFixed(3);
            if(state.type == 1 ) {
                state.tensoes.w = (state.tensoes.wt / Math.cos(state.entradas.phi * (Math.PI / 180))).toFixed(3);
            } else {
                state.tensoes.w = (state.tensoes.wt / (Math.cos(state.entradas.u * (Math.PI / 180)) * Math.cos(state.entradas.phi * (Math.PI / 180)))).toFixed(3);
            }

            if(state.type == 2) {
                state.tensoes.wa = (state.tensoes.wt * Math.tan(state.entradas.u * (Math.PI / 180))).toFixed(3);
            }


        },
        ChangeKa: (state, number) => {
            if (number.MM && number.CO) {
                state.anatensoes.ka = CalcGear.Ka(number);
            }
        },
        ChangeJ: (state, number) => {
            if (number.CR && number.PD) {
                const t = CalcGear.J1(number);
                const t2 = CalcGear.J2(number);
                state.anatensoes.j = t.FJ;
                state.anatensoes.j2 = t2.FJ;
            }
        },
        SaveNew: (state, number) => {
            const newState = state;
            if(localStorage.saves) {
                const Array = JSON.parse(localStorage.saves);
                Array.push(newState);
                localStorage.setItem('saves', JSON.stringify(Array));
            }
            else {
                const Array = [];
                Array.push(newState);
                localStorage.setItem('saves', JSON.stringify(Array));
            }
        },
        DeleteLocal:(state, index) => {
            const Array = JSON.parse(localStorage.saves);
            Array.splice(index, 1);
            localStorage.setItem('saves', JSON.stringify(Array));
        },
        SaveLocal: (state, index) => {
            const newState = state;
            console.log('state', index);
            if(localStorage.saves) {
                const Array = JSON.parse(localStorage.saves);
                Array[index] = state;
                localStorage.setItem('saves', JSON.stringify(Array));
            }
            else {
                const Array = [];
                Array.push(newState);
                localStorage.setItem('saves', JSON.stringify(Array));
            }
        },
        LoadSave: (state, index) => {
            const saves = JSON.parse(localStorage.saves);
            state.entradas = saves[index].entradas;
            state.pinhao = saves[index].pinhao;
            state.engrenagem = saves[index].engrenagem;
            state.tensoes = saves[index].tensoes;
            state.anatensoes = saves[index].anatensoes;
            state.anatensoes2 = saves[index].anatensoes2;
            state.Abs = saves[index].Abs;
            state.type = saves[index].type;

            Object.keys(CalcGear.pinhao).forEach(value => {
                CalcGear.pinhao[value] = state.pinhao[value];
            });

            Object.keys(CalcGear.engrenagem).forEach(value => {
                CalcGear.engrenagem[value] = state.engrenagem[value];
            });

            Object.keys(CalcGear.tensoes).forEach(value => {
                CalcGear.tensoes[value] = state.tensoes[value];
            });

            Object.keys(CalcGear.entradas).forEach(value => {
                CalcGear.entradas[value] = state.entradas[value];
            });
        },
    },
    actions: {
        LoadSaveState: ({commit}, index) => {
            commit("LoadSave", index);
        },
        DeleteSaveState: ({commit}, index) => {
            commit("DeleteLocal", index);
        },
        SaveNewState: ({commit}, field, number) => {
            commit("SaveNew");
        },
        SaveState: ({commit}, index) => {
            commit("SaveLocal", index);
        },
        ChangePinhaoState: ({commit}, field, number) => {
            commit("ChangePinhao", field, number)
        },
        ChangeEngrenagemState: ({commit}, field, number) => {
            commit("ChangeEngrenagem", field, number)
        },
        ChangeEntradasState: ({commit}, field, number) => {
            commit("ChangeEntradas", field, number)
        },
        onChangeMGState: ({commit}, number) => {
            commit("ChangeMG", number);
        },
        onChangeMState: ({commit}, number) => {
            commit("ChangeM", number);
        },
        onChangePhiState: ({commit}, number) => {
            commit("ChangePhi", number);
        },
        onChangeCnState: ({commit}, number) => {
            commit("ChangeCn", number);
        },
        ChangeHPState: ({commit}, number) => {
            commit("ChangeHPState", number);
        },
        ChangePWState: ({commit}, number) => {
            commit("ChangePWState", number);
        },
        ChangeRPMState: ({commit}, number) => {
            commit("ChangeRPM", number);
        },
        ChangeKAState: ({commit}, number) => {
            commit("ChangeKa", number);
        },
        ChangeJState: ({commit}, number) => {
            commit("ChangeJ", number);
        },
        ChangeTypeState: ({commit}, number) => {
            commit("ChangeType", number);
        },
    }
}

export default VuexCalculadora