$(function () {

    // setup modal-body heights
    $(window).resize(function (e) {
        var height = $(window).height();
        $('#modal-info .modal-body, #modal-about .modal-body').css({
            height: height * .73
        });
    }).resize();

    app = new Vue({
        el: '#app',
        methods: {
            carousel_next: function () {
                $('#form').carousel('next');
            },
            carousel_prev: function () {
                $('#form').carousel('prev');
            },
            validate: function () {
                var app = this;
                var acum = 0;
                app.answered = 0;
                $(this.questions).map(function (index, object) {
                    if (object.value !== null) {
                        acum += object.value;
                        app.answered++;
                    }
                });

                this.result = precisionRound(acum / this.questions.length, 2);
                this.result_label = this.evaluation.options[Math.round(this.result)-1];
                this.progress_style.width = (this.answered * 100 / this.questions.length) + '%';

                this.carousel_next();

                return (this.questions.length == this.answered);
            },
            reset: function () {
                var app = this;
                $(this.questions).map(function (index, object) {
                    if (object.value !== null) {
                        object.value = null;
                    }
                });
                app.answered = 0;
                app.progress_style.width = '0%';
                $('#form').carousel(0);
            }
        },
        data: {
            answered: 0,
            result: null,
            result_label: '',
            progress_style: {
                width: '0%',
            },
            evaluation: {
                label: 'Estado funcional global',
                options: [
                    'Está totalmente incapacitado y exige custodia permanente.',
                    'Tiene limitaciones que impiden que permanezca 8 horas solo.',
                    'Tiene limitaciones que exigen ayuda diaria, pero puede pasar una ida solo.',
                    'Es independiente pero necesita de ayuda no diaria para alguna AIVD.',
                    'Es totalmente independiente y activo en su vida diaria.',
                ]
            },
            questions: [
                {
                    label: '1. Continencia',
                    name: 'p01',
                    value: null,
                    options: [
                        {value: 5, label: 'Permanentemente continente.'},
                        {value: 4, label: 'Ha perdido permanentemente el control de la micción.'},
                        {value: 3, label: 'Incontinencia urinaria, con limitaciones en su vida diaria.'},
                        {
                            value: 2,
                            label: 'Incontinencia urinaria que le impide realizar su vida diaria o le obliga a sondaje.'
                        },
                        {value: 1, label: 'Doble incontinencia (urinaria o fecal) con pérdida de autonomía.'},
                    ]
                },
                {
                    label: '2. Movilidad',
                    name: 'p02',
                    value: null,
                    options: [
                        {value: 5, label: 'Se moviliza sin limitaciones, tanto fuera como dentro del hogar.'},
                        {
                            value: 4,
                            label: 'Alguna limitación en la movilidad, en particular con el transporte público.'
                        },
                        {value: 3, label: 'Dificultades de movilidad que limitan satisfacer su vida diaria.'},
                        {value: 2, label: 'Depende para movilizarse de la ayuda de otra persona.'},
                        {value: 1, label: 'Se encuentra totalmente confinado a la cama o sillón.'},
                    ]
                },
                {
                    label: '3. Equilibrio',
                    name: 'p03',
                    value: null,
                    options: [
                        {value: 5, label: 'No refiere trastorno del equilibrio.'},
                        {value: 4, label: 'Refiere trastorno del equilibrio pero no afecta su vida diaria.'},
                        {value: 3, label: 'Trastorno del equilibrio con caída y limitación de la autonomía.'},
                        {
                            value: 2,
                            label: 'Trastorno del equilibrio que lo hace dependiente de ayuda en su vida diaria.'
                        },
                        {value: 1, label: 'La falta de equilibrio lo mantiene totalmente incapacitado.'}
                    ]
                },
                {
                    label: '4. Visión',
                    name: 'p04',
                    value: null,
                    options: [
                        {value: 5, label: 'Tiene visión normal (aunque para ello use lentes).'},
                        {value: 4, label: 'Refiere dificultad para ver pero esto no lo limita en su vida diaria.'},
                        {value: 3, label: 'Dificultad para ver que limita sus actividades cotidianas.'},
                        {value: 2, label: 'Los problemas de la visión le obligan a depender de otra persona.'},
                        {value: 1, label: 'Ciego o totalmente incapacitado por falta de visión.'}
                    ]
                },
                {
                    label: '5. Audición',
                    name: 'p05',
                    value: null,
                    options: [
                        {value: 5, label: 'Tiene audición normal (aunque para ello use prótesis auditiva).'},
                        {value: 4, label: 'Refiere dificultad para oír, pero no repercute en su vida diaria.'},
                        {value: 3, label: 'Evidente dificultad para oír, con repercusión en su vida diaria.'},
                        {value: 2, label: 'Severos problemas de audición que le limitan en la comunicación.'},
                        {value: 1, label: 'Sordo o aislado por la falta de audición.'}
                    ]
                },
                {
                    label: '6. Uso de medicamentos',
                    name: 'p06',
                    value: null,
                    options: [
                        {value: 5, label: 'Sin medicamentos (no incluye vitaminas o productos naturales).'},
                        {value: 4, label: 'Usa menos de tres medicamentos de forma habitual.'},
                        {
                            value: 3,
                            label: 'Usa de tres a cinco medicamentos por más de un mes, o indicados por varios médicos.'
                        },
                        {value: 2, label: 'Usa más de 6 medicamentos.'},
                        {value: 1, label: 'Se automedica o no lleva control de los medicamentos que toma.'}
                    ]
                },
                {
                    label: '7. Sueño',
                    name: 'p07',
                    value: null,
                    options: [
                        {value: 5, label: 'No refiere trastornos del sueño.'},
                        {value: 4, label: 'Trastornos ocasionales del sueño, no tiene necesidad de somníferos.'},
                        {value: 3, label: 'Debe usar somníferos para lograr un sueño que lo satisfaga.'},
                        {value: 2, label: 'Pese al uso de psicofármacos mantiene trastornos del sueño.'},
                        {value: 1, label: 'Trastornos del sueño que le impiden realizar su vida diaria.'}
                    ]
                },
                {
                    label: '8. Estado emocional',
                    name: 'p08',
                    value: null,
                    options: [
                        {value: 5, label: 'Se mantiene usualmente con buen estado de ánimo.'},
                        {value: 4, label: 'Trastornos emocionales ocasionales que supera sin ayuda emocional.'},
                        {value: 3, label: 'El trastorno emocional lo obliga a tratamiento.'},
                        {value: 2, label: 'Mantiene trastornos emocionales que lo limitan aún con tratamiento.'},
                        {value: 1, label: 'Los trastornos emocionales lo incapacitan. Intentos o ideas suicida.'}
                    ]
                },
                {
                    label: '9. Memoria',
                    name: 'p09',
                    value: null,
                    options: [
                        {value: 5, label: 'Buena memoria. Niega trastornos de la misma.'},
                        {value: 4, label: 'Refiere problemas de memoria pero estos no lo limitan en su vida diaria.'},
                        {value: 3, label: 'Problemas de memoria que lo limitan en sus actividades de vida diaria.'},
                        {
                            value: 2,
                            label: 'Trastornos de la memoria que lo obligan a ser dependiente una parte del tiempo.'
                        },
                        {value: 1, label: 'La pérdida de memoria lo mantiene incapacitado o dependiente total.'}
                    ]
                },
                {
                    label: '10. Apoyo familiar',
                    name: 'p10',
                    value: null,
                    options: [
                        {value: 5, label: 'Cuenta con todo el apoyo familiar que demandan sus necesidades.'},
                        {value: 4, label: 'Existe apoyo familiar pero puede tener limitaciones en ocasiones.'},
                        {value: 3, label: 'Apoyo familiar restringido a cuando el anciano tiene situación de crisis.'},
                        {value: 2, label: 'Apoyo familiar inseguro incluso en momentos de crisis para el anciano.'},
                        {value: 1, label: 'Ausencia o abandono familiar total.'}
                    ]
                },
                {
                    label: '11. Apoyo social',
                    name: 'p11',
                    value: null,
                    options: [
                        {value: 5, label: 'Apoyo social e irrestricto por parte de vecinos y/o amigos.'},
                        {value: 4, label: 'Cuenta con apoyo de vecinos o amigos pero este es limitado.'},
                        {value: 3, label: 'Apoyo de vecinos y amigos restringido a momentos de crisis.'},
                        {value: 2, label: 'Apoyo de vecinos y amigos inseguros aún en momentos de crisis.'},
                        {value: 1, label: 'Aislado, ausencia total de apoyo de vecinos y amigos.'}
                    ]
                },
                {
                    label: '12. Situación económica',
                    name: 'p12',
                    value: null,
                    options: [
                        {value: 5, label: 'Cubre todas las necesidades con ingresos propios.'},
                        {value: 4, label: 'Cubre todas sus necesidades pero lo hace con la ayuda de otros.'},
                        {value: 3, label: 'Cubre solo sus necesidades básicas, aun con la ayuda de otros.'},
                        {value: 2, label: 'Tiene dificultad para cubrir todas sus necesidades básicas.'},
                        {value: 1, label: 'Depende económicamente de la asistencia social.'}
                    ]
                },
            ]
        }
    });
});

function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}
