// eslint-disable-next-line @typescript-eslint/no-var-requires
const CalcGear = {
    data: require('/public/data.json'),

    pinhao: {
        dp: 0.00,
        N1: 13.0,
        de: 0.00,
        a: 0.00,
        b: 0.00,
        ht: 0.00,
        di: 0.00,
        db: 0.00,
        r: 0.00,
        c: 0.00,
        t: 0.00,
        v: 0.00,
        pc: 0.00,
        pb: 0.00,
        pd: 0.00,
    },

    engrenagem: {
        N1: 23.0,
        dp: 0.00,
        de: 0.00,
        a: 0.00,
        b: 0.00,
        ht: 0.00,
        di: 0.00,
        db: 0.00,
        r: 0.00,
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
        M: '4',
        CE: 0.0,
        Cn: 0.0,
        Z: 0.0,
        phiN: 0.0,
        F: 0.0,
        Mp: 0.0,
    },

    TabModulo: [
        0.3,
        0.4,
        0.8,
        1,
        1.25,
        1.5,
        2,
        3,
        4,
        5,
        6,
        8,
        10,
        12,
        16,
        20,
        25,
    ],

    anatensoes: {
        ab: 0.0,
        j: "",
        j2: "",
        ka: 0.0,
        kb: 1,
        ki: 0.0,
        km: 0.0,
        ks: 0.0,
        kv: 0.0,
    },

    tensoes: {
        p: 0,
        pw: 0,
        rpm: 0,
        tp: 0,
        tg: 0,
        wr: 0,
        wt: 0,
        w: 0,
        wa:0.0,
    },

    TabDentesPinhao: [
        77.00,
        6.3126,
        6.3125,
        3.0001,
        3.0000,
        1.8572,
        1.8571,
        1.2309,
        1.2308,
        1.0,
    ],

    TabDentesPinhaoResult: {
        'R77': 17,
        'R6.3126': 17,
        'R6.3125': 16,
        'R3.0001': 16,
        'R3': 15,
        'R1.8572': 15,
        'R1.8571': 14,
        'R1.2309': 14,
        'R1.2308': 13,
        'R1.23': 13,
        'R1': 13,
    },

    CalcPinhao: function (field, number, entradas = this.entradas) {
        Object.keys(this.pinhao).forEach(
            function (val, index) {
                if (field == val) {
                    CalcGear.pinhao[field] = parseFloat(number);
                }
            }
        );

        Object.keys(this.pinhao).forEach(
            function (val, index) {
                if (field != val) {
                    CalcGear.pinhao[val] = CalcGear[val](CalcGear.pinhao);
                }
            }
        );


        return this.pinhao;
    },

    CalcEngrenagem: function (field = null, number = null, entradas = this.entradas) {
        if (field != null) {
            Object.keys(this.engrenagem).forEach(
                function (val, index) {
                    if (field == val) {
                        CalcGear.engrenagem[field] = number;
                    }
                }
            );
        }

        Object.keys(this.engrenagem).forEach(
            function (val, index) {
                if (field != val) {
                    CalcGear.engrenagem[val] = CalcGear[val](CalcGear.engrenagem);
                }
            }
        );

        return this.engrenagem;
    },

    CalcEntradas: function (field = null, number = null, entradas = this.entradas) {
        if (field != null && field != 'type') {
            Object.keys(this.entradas).forEach(
                function (val, index) {
                    if (field == val) {
                        CalcGear.entradas[field] = parseFloat(number);
                    }
                }
            );
        }

        Object.keys(this.entradas).forEach(
            function (val, index) {
                if (field != val && val != 'phi' && val != "Cn" && val != "M") {
                    CalcGear.entradas[val] = CalcGear[val](entradas);
                }
            }
        );
        return this.entradas;
    },

    CalcAnalTensoes: function (field = null, number = null, entradas = this.entradas) {
        if (field != null) {
            Object.keys(this.anatensoes).forEach(
                function (val, index) {
                    if (field == val) {
                        CalcGear.anatensoes[field] = parseFloat(number);
                    }
                }
            );
        }

        Object.keys(this.anatensoes).forEach(
            function (val, index) {
                if (field != val && val != 'phi' && val != "Cn" && val != "M") {
                    CalcGear.anatensoes[val] = CalcGear[val](entradas);
                }
            }
        );
        return this.anatensoes;
    },

    N1: function (val) {
        return Math.ceil(val.dp / this.entradas.M);
    },

    dp: function (val) {
        return (parseFloat(val.N1) * parseFloat(this.entradas.M)).toFixed(3);
    },

    de: function (val) {
        return (parseFloat(this.entradas.M) * (parseFloat(val.N1) + 2)).toFixed(3);
    },

    a: function (val) {
        return (parseFloat(this.entradas.M)).toFixed(3);
    },

    b: function (val) {
        return (1.25 * parseFloat(this.entradas.M)).toFixed(3);
    },

    ht: function (val) {
        return (parseFloat(val.a) + parseFloat(val.b)).toFixed(3);
    },

    di: function (val) {
        return (parseFloat(val.dp) - 2 * parseFloat(val.b)).toFixed(3);
    },

    db: function (val) {
        return (parseFloat(val.dp) * Math.cos((this.entradas.phi * (Math.PI / 180)))).toFixed(3);
    },

    r: function (val) {
        return (parseFloat(val.dp) / 2).toFixed(3);
    },

    c: function (val) {
        return (parseFloat(val.b) - parseFloat(val.a)).toFixed(3);
    },

    t: function (val) {
        return (parseFloat(this.entradas.M) * parseFloat(val.N1) * Math.sin((90 / val.N1 * (Math.PI / 180)))).toFixed(3);
    },

    v: function (val) {
        return ((parseFloat(this.entradas.M) * Math.PI) / 2).toFixed(3);
    },

    pc: function (val) {
        return (Math.PI * val.dp / val.N1).toFixed(3);
    },

    pb: function (val) {
        return (val.pc * Math.cos((this.entradas.phi * (Math.PI / 180)))).toFixed(3);
    },

    pd: function (val) {
        return (val.N1 / val.dp).toFixed(3);
    },


    M: function (ent) {
        //console.log(this.RoundM(this.pinhao.dp / this.pinhao.N1));
        return (this.RoundM(this.pinhao.dp / this.pinhao.N1));
    },

    mV: function (ent) {
        return (this.pinhao.r / this.engrenagem.r).toFixed(3);
    },

    mA: function (ent) {
        return (this.engrenagem.r / this.pinhao.r).toFixed(3);
    },

    mG: function (ent) {
        return this.entradas.mV > this.entradas.mA ? this.entradas.mV : this.entradas.mA;
    },

    CE: function (ent) {
        return parseFloat(this.engrenagem.r) + parseFloat(this.pinhao.r);
    },

    Z: function (ent) {
        let Z = Math.sqrt(Math.pow((parseFloat(this.pinhao.r) + parseFloat(this.pinhao.a)), 2) - Math.pow(parseFloat(this.pinhao.r) * Math.cos((ent.phi * (Math.PI / 180))), 2));
        Z = Z + Math.sqrt(Math.pow((parseFloat(this.engrenagem.r) + parseFloat(this.engrenagem.a)), 2) - Math.pow(parseFloat(this.engrenagem.r) * Math.cos(ent.phi * (Math.PI / 180)), 2));
        Z = Z - (parseFloat(this.entradas.CE) * Math.sin(ent.phi * (Math.PI / 180)));
        return Z.toFixed(3);
    },

    F: function (ent) {
        return this.entradas.M * 12;
    },

    phiN: function (ent) {
        let phiN = Math.cos(this.entradas.phi * (Math.PI / 180)) / (ent.Cn / ent.CE);
        phiN = Math.acos(phiN) * (180 / Math.PI);
        return phiN;
    },

    ab: function (ent) {
        const ab = (parseFloat(this.tensoes.wt) / (parseFloat(this.entradas.F) * parseFloat(this.entradas.M) * parseFloat(this.anatensoes.j)))
            * parseFloat(this.anatensoes.ka) * parseFloat(this.anatensoes.km) * parseFloat(this.anatensoes.ks) * parseFloat(this.anatensoes.kb)
            * parseFloat(this.anatensoes.ki) / parseFloat(this.anatensoes.kv);
        return ab;
    },

    J1: function (ent) {
        const filter = {
            RD: "P",
            AP: this.entradas.phi,
            PD: ent.PD,
            CR: ent.CR,
            NP: this.pinhao.N1,
            NE: this.engrenagem.N1,
        };

        const result = this.data.J.filter(function (item) {
            for (const key in filter) {
                if (item[key] === undefined || item[key] != filter[key])
                    return false;
            }
            return true;
        });

        if (result.length > 0) {
            return result[0];
        } else {
            let filter = {
                RD: "P",
                AP: this.entradas.phi,
                PD: ent.PD,
                CR: ent.CR,
            };

            let result = this.data.J.filter(function (item) {
                for (const key in filter) {
                    if (item[key] === undefined || item[key] != filter[key])
                        return false;
                }
                return true;
            });

            let min = 0;

            let minE = 0;


            result.forEach((v, index) => {
                if (parseInt(v.NP) < this.pinhao.N1) {
                    if (min < parseInt(v.NP)) {
                        min = parseInt(v.NP);
                    }
                }

                if (parseInt(v.NE) < this.engrenagem.N1) {
                    if (minE < parseInt(v.NE)) {
                        minE = v.NE;
                    }
                }
            });

            let max = 0;
            let maxE = 0;


            result.forEach((v, index) => {
                if (parseInt(v.NP) > this.pinhao.N1) {
                    if (0 < parseInt(v.NP) && max == 0) {
                        max = v.NP;
                    }
                }

                if (parseInt(v.NE) > this.engrenagem.N1) {
                    if (0 < parseInt(v.NE) && maxE == 0) {
                        maxE = v.NE;
                    }
                }
            });


            filter = {
                RD: "P",
                AP: this.entradas.phi,
                PD: ent.PD,
                CR: ent.CR,
            };


            result = this.data.J.filter(item => {
                for (const key in filter) {
                    if (item[key] === undefined || item[key] != filter[key] || (item.NP != min && item.NP != max))
                        return false;
                }
                return true;
            });


            //console.log(min, max, minE, maxE);


            result = result.filter(item => {
                for (const key in filter) {
                    if (item[key] === undefined || item[key] != filter[key] || (item.NE != minE && item.NE != maxE))
                        return false;
                }
                return true;
            });

            //console.log('J1', result);

            const NPmin = parseFloat(result[0].NP);
            const NPmax = parseFloat(result[result.length - 1].NP);
            const JMin = parseFloat(result[0].FJ);
            const JMax = parseFloat(result[result.length - 1].FJ);


            const ND = this.pinhao.N1;

            return {
                FJ: (JMin + ((JMax - JMin) / (NPmax - NPmin) * (ND - NPmin))).toFixed(3),
            };

        }
    },

    J2: function (ent) {
        const filter = {
            RD: "E",
            AP: this.entradas.phi,
            PD: ent.PD,
            CR: ent.CR,
            NP: this.pinhao.N1,
            NE: this.engrenagem.N1,
        };

        //console.log(filter);

        const result = this.data.J.filter(function (item) {
            for (const key in filter) {
                if (item[key] === undefined || item[key] != filter[key])
                    return false;
            }
            return true;
        });

        //console.log(result);

        if (result.length > 0) {
            return result[0];
        } else {
            let filter = {
                RD: "E",
                AP: this.entradas.phi,
                PD: ent.PD,
                CR: ent.CR,
            };

            let result = this.data.J.filter(function (item) {
                for (const key in filter) {
                    if (item[key] === undefined || item[key] != filter[key])
                        return false;
                }
                return true;
            });

            let min = 0;

            let minE = 0;


            result.forEach((v, index) => {
                if (parseInt(v.NP) < this.pinhao.N1) {
                    if (min < parseInt(v.NP)) {
                        min = v.NP;
                    }
                }

                if (parseInt(v.NE) < this.engrenagem.N1) {
                    if (minE < parseInt(v.NE)) {
                        minE = v.NE;
                    }
                }
            });

            let max = 0;
            let maxE = 0;

            result.forEach((v, index) => {
                if (parseInt(v.NP) > this.pinhao.N1) {
                    if (0 < parseInt(v.NP) && max == 0) {
                        max = v.NP;
                    }
                }
                if (parseInt(v.NE) > this.engrenagem.N1) {
                    if (0 < v.NE && maxE == 0) {
                        maxE = v.NE;
                    }
                }
            });

            filter = {
                RD: "E",
                AP: this.entradas.phi,
                PD: ent.PD,
                CR: ent.CR,
            };


            result = this.data.J.filter(function (item) {
                for (const key in filter) {
                    if (item[key] === undefined || item[key] != filter[key] || (item.NP != min && item.NP != max))
                        return false;
                }
                return true;
            });

            result = result.filter(function (item) {
                for (const key in filter) {
                    if (item[key] === undefined || item[key] != filter[key] || (item.NE != minE && item.NE != maxE))
                        return false;
                }
                return true;
            });

            const NPmin = parseFloat(result[0].NE);
            const NPmax = parseFloat(result[result.length - 1].NE);
            const JMin = parseFloat(result[0].FJ);
            const JMax = parseFloat(result[result.length - 1].FJ);


            const ND = this.engrenagem.N1;


            return {
                FJ: (JMin + ((JMax - JMin) / (NPmax - NPmin) * (ND - NPmin))).toFixed(3),
            };
        }
    },

    Ka: function (ent) {
        const filter = {
            MM: ent.MM,
            CO: ent.CO,
        };

        const result = this.data.Ka.filter(function (item) {
            for (const key in filter) {
                if (item[key] === undefined || item[key] != filter[key])
                    return false;
            }
            return true;
        });

        return result[0].Ka;
    },

    Mp: function (ent) {
        const Mp = (this.entradas.Z / this.pinhao.pb);
        return (Mp).toFixed(3);
    },

    kvApp: function (ent) {
        const filter = {
            AP: ent,
        };

        const result = this.data.Kv.filter(function (item) {
            for (const key in filter) {
                if (item[key] === undefined || item[key] != filter[key])
                    return false;
            }
            return true;
        });
        return result;
    },

    kvVelo: function (ent) {
        const result = this.data.KVe.filter(function (item) {
            if ((ent > item['Min'] && ent <= item['Max']) || item['Max'] == null && ent > item['Min'])
                return true;
            else return false;
        });
        return result;
    },

    Ks: function (ent) {
        return 1;
    },

    RoundM: function (number, array = this.TabModulo) {
        return array.reduce(function (prev, curr) {
            return (Math.abs(curr - number) < Math.abs(prev - number) ? curr : prev);
        });
    },

    QvApp: function (number) {
        number = parseFloat(number);
        const filter = {
            VR: number,
        };

        const result = this.data.Qv.filter(function (item) {
            for (const key in filter) {
                if (item[key] === undefined || item[key] != filter[key])
                    return false;
            }
            return true;
        });

        if (result.length > 0) {
            return result[0].Qv;
        } else {
            let min = 0;
            let max = 0;
            let minArr = Object;
            let maxArr = Object;

            this.data.Qv.forEach((item, index) => {
                if (item.VR < number) {
                    if (min < item.VR) {
                        min = item.VR;
                        minArr = this.data.Qv[index];
                    }
                }

                if (item.VR > number) {
                    if (max < item.VR && max == 0) {
                        max = item.VR;
                        maxArr = this.data.Qv[index];
                    }
                }
            });
            console.log('min', min);
            console.log('max', max);
            console.log('minArr', minArr);
            console.log('maxArr', maxArr);
            return (parseFloat(minArr.Qv) + ((parseFloat(maxArr.Qv) - parseFloat(minArr.Qv)) / (parseFloat(max) - parseFloat(min)) * (number - parseFloat(min)))).toFixed(3);
        }

    },

    GetMaterial: function (number) {
        return this.data.Material;
    },

    CheckMaterial: function (number) {
        const filter = {
            M: number,
        };

        const result = this.data.Material.filter(function (item) {
            for (const key in filter) {
                if (item[key] === undefined || item[key] != filter[key])
                    return false;
            }
            return true;
        });
        return result[0];
    },

    RuApp: function (number) {
        number = parseFloat(number);
        const filter = {
            RM: number,
        };

        const result = this.data.Ru.filter(function (item) {
            for (const key in filter) {
                if (item[key] === undefined || item[key] != filter[key])
                    return false;
            }
            return true;
        });

        if (result.length > 0) {
            return result[0].Qv;
        } else {

            if (number < 25 && number > 0.1) {
                let min = 0;
                let max = 0;
                let minArr = Object;
                let maxArr = Object;
                this.data.Ru.forEach((item, index) => {
                    if (item.RM < number) {
                        if (min < item.RM) {
                            min = item.RM;
                            minArr = this.data.Ru[index];
                        }
                    }

                    if (item.RM > number) {
                        if (max < item.RM && max == 0) {
                            max = item.RM;
                            maxArr = this.data.Ru[index];
                        }
                    }
                });

                return (parseFloat(minArr.Qv) + ((parseFloat(maxArr.Qv) - parseFloat(minArr.Qv)) / (parseFloat(max) - parseFloat(min)) * (number - parseFloat(min)))).toFixed(3);
            } else {

                if (number <= 0.1) {
                    return 13.00;
                } else {
                    return 5.00;
                }
            }
        }

    },

    RoundDentesPinhao: function (number) {
        //console.log(this.RoundM(number, this.TabDentesPinhao));
        return this.TabDentesPinhaoResult['R' + this.RoundM(number, this.TabDentesPinhao)];
    },

    Lerp: function (v0, v1, amt, maxMove = 0, minDiff = 0.0001) {
        let diff = v1 - v0;
        if (maxMove > 0) {
            diff = Math.min(diff, maxMove);
            diff = Math.max(diff, -maxMove);
        }
        if (Math.abs(diff) < minDiff) {
            return v1;
        }
        return v0 + diff * amt;
    },

    Km: function () {
        const filter = {
            LF: this.entradas.F,
        };

        const result = this.data.Km.filter(function (item) {
            for (const key in filter) {
                if (item[key] === undefined || item[key] != filter[key])
                    return false;
            }
            return true;
        });

        if (result.length > 0) {
            return parseFloat(result[0].Km);
        } else {
            let min = 0;
            let max = 0;
            let minArr = Object;
            let maxArr = Object;
            this.data.Km.forEach((item, index) => {
                if (item.LF < this.entradas.F) {
                    if (min < item.LF) {
                        min = item.LF;
                        minArr = this.data.Km[index];
                    }
                }

                if (item.LF > this.entradas.F) {
                    if (max < item.LF && max == 0) {
                        max = item.LF;
                        maxArr = this.data.Km[index];
                    }
                }
            });
            //console.log(minArr);
            return (parseFloat(minArr.Km) + ((parseFloat(maxArr.Km) - parseFloat(minArr.Km)) / (parseFloat(max) - parseFloat(min)) * (this.entradas.F - parseFloat(min)))).toFixed(3);
        }
    },
}
export {CalcGear}