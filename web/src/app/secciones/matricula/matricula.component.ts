import { ImagenAdaptableDirective } from '../../shared/imagen-adaptable/imagen-adaptable.directive';
import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UBICACION, WHATSAPP_VISIBLE, telefonoUrl, whatsappUrl } from '../../core/contacto';
import { FondoDibujadoComponent } from '../../shared/fondo-dibujado/fondo-dibujado.component';
import { DivisorComponent } from '../../shared/divisor/divisor.component';
import { IconoComponent } from '../../shared/icono/icono.component';
import { RevelarDirective } from '../../shared/revelar/revelar.directive';
import { SiluetasFondoComponent } from '../../shared/silueta/siluetas-fondo.component';
import { calcularEdad, describirEdad, escribirFechaIso, hoySinHora, leerFechaIso } from './edad';
import {
  CAMPOS_OBLIGATORIOS,
  CampoMatricula,
  DIGITOS_CELULAR,
  DIGITOS_DNI,
  DISTRITOS_CANETE,
  GRUPOS_MATRICULA,
  GrupoMatricula,
  IdGrupoMatricula,
  LARGO_MAXIMO_DIRECCION,
  LARGO_MAXIMO_NOMBRE,
  LARGO_MINIMO_DIRECCION,
  MENSAJES_DE_ERROR,
  MENSAJE_DE_ERROR_GENERICO,
  ORDEN_DE_CAMPOS,
  PASOS_DESPUES_DE_ENVIAR,
  PROGRAMAS_DE_INTERES,
  PROGRAMA_SIN_DEFINIR,
  SILUETAS_MATRICULA,
  GARABATOS_MATRICULA
} from './matricula.data';
import { construirMensajeMatricula } from './matricula.mensaje';
import {
  EDAD_MAXIMA_ANIOS,
  EDAD_MINIMA_ANIOS,
  celularPeruValidator,
  direccionValidator,
  dniValidator,
  erroresDeFechaNacimiento,
  fechaNacimientoValidator,
  nombreCompletoValidator
} from './matricula.validadores';

const PREFIJO_ID = 'matricula-';

/** Fecha de nacimiento más antigua aceptada: la de quien cumple 3 años mañana (hoy aún tiene 2). */
function fechaMinimaDeNacimiento(): string {
  const hoy = hoySinHora();
  return escribirFechaIso(new Date(hoy.getFullYear() - (EDAD_MAXIMA_ANIOS + 1), hoy.getMonth(), hoy.getDate() + 1));
}

/** Fecha de nacimiento más reciente aceptada: la de quien cumple 1 año hoy. */
function fechaMaximaDeNacimiento(): string {
  const hoy = hoySinHora();
  return escribirFechaIso(new Date(hoy.getFullYear() - EDAD_MINIMA_ANIOS, hoy.getMonth(), hoy.getDate()));
}

/**
 * Formulario "Matricula a tu niño". No hay servidor: al enviarlo, valida los datos
 * y abre WhatsApp con la ficha escrita para que la directora la reciba en su celular.
 */
@Component({
  selector: 'app-matricula',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ImagenAdaptableDirective,
    FondoDibujadoComponent,
    ReactiveFormsModule,
    DivisorComponent,
    IconoComponent,
    RevelarDirective,
    SiluetasFondoComponent
  ],
  templateUrl: './matricula.component.html'
})
export class MatriculaComponent {
  readonly garabatos = GARABATOS_MATRICULA;
  private readonly creadorDeFormularios = inject(NonNullableFormBuilder);
  private readonly anfitrion = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly distritos = DISTRITOS_CANETE;
  readonly programas = PROGRAMAS_DE_INTERES;
  readonly siluetas = SILUETAS_MATRICULA;
  readonly pasos = PASOS_DESPUES_DE_ENVIAR;
  readonly grupos = GRUPOS_MATRICULA;
  readonly totalDeCampos = CAMPOS_OBLIGATORIOS.length;
  readonly digitosDni = DIGITOS_DNI;
  readonly digitosCelular = DIGITOS_CELULAR;
  readonly largoMaximoNombre = LARGO_MAXIMO_NOMBRE;
  readonly largoMaximoDireccion = LARGO_MAXIMO_DIRECCION;
  readonly fechaMaxima = fechaMaximaDeNacimiento();
  readonly fechaMinima = fechaMinimaDeNacimiento();

  readonly telefono = WHATSAPP_VISIBLE;
  readonly telefonoEnlace = telefonoUrl();
  readonly ubicacion = UBICACION;
  readonly whatsapp = whatsappUrl('Hola Mi Paraíso, tengo una consulta sobre la matrícula.');

  readonly formulario = this.creadorDeFormularios.group({
    nombreNino: ['', [Validators.required, Validators.maxLength(LARGO_MAXIMO_NOMBRE), nombreCompletoValidator]],
    fechaNacimiento: ['', [Validators.required, fechaNacimientoValidator]],
    programa: [PROGRAMA_SIN_DEFINIR],
    nombreApoderado: ['', [Validators.required, Validators.maxLength(LARGO_MAXIMO_NOMBRE), nombreCompletoValidator]],
    dni: ['', [Validators.required, dniValidator]],
    celular: ['', [Validators.required, celularPeruValidator]],
    distrito: ['', Validators.required],
    direccion: [
      '',
      [
        Validators.required,
        Validators.minLength(LARGO_MINIMO_DIRECCION),
        Validators.maxLength(LARGO_MAXIMO_DIRECCION),
        direccionValidator
      ]
    ],
    autorizacion: [false, Validators.requiredTrue]
  });

  private readonly fechaElegida = toSignal(this.formulario.controls.fechaNacimiento.valueChanges, {
    initialValue: ''
  });

  /** La edad se calcula sola a partir de la fecha de nacimiento; así nunca se contradicen. */
  readonly edad = computed(() => {
    const valor = this.fechaElegida();
    const nacimiento = leerFechaIso(valor);
    if (!nacimiento || erroresDeFechaNacimiento(valor)) return '';
    return describirEdad(calcularEdad(nacimiento));
  });

  /**
   * Cambia con cada tecla. Al emitir, Angular ya recalculó la validez de cada campo,
   * por eso los cálculos de avance pueden leer `control.valid` justo después.
   */
  private readonly valores = toSignal(this.formulario.valueChanges, {
    initialValue: this.formulario.getRawValue()
  });

  readonly camposListos = computed(() => {
    this.valores();
    return CAMPOS_OBLIGATORIOS.filter((campo) => this.formulario.controls[campo].valid).length;
  });

  /** Fracción (0 a 1) de los datos de un grupo que ya son válidos; llena su tramo del indicador. */
  avanceDe(grupo: GrupoMatricula): number {
    this.valores();
    const validos = grupo.campos.filter((campo) => this.formulario.controls[campo].valid).length;
    return validos / grupo.campos.length;
  }

  grupoCompleto(id: IdGrupoMatricula): boolean {
    const grupo = this.grupos.find((g) => g.id === id);
    return !!grupo && this.avanceDe(grupo) === 1;
  }

  /** Lleva al primer dato pendiente del grupo (o al primero, si ya está completo). */
  irAGrupo(grupo: GrupoMatricula): void {
    const destino = grupo.campos.find((campo) => this.formulario.controls[campo].invalid) ?? grupo.campos[0];
    const campo = this.anfitrion.querySelector<HTMLElement>(`#${this.idDe(destino)}`);
    campo?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    campo?.focus({ preventScroll: true });
  }

  /** Tras el primer intento de envío se muestran todos los errores, aunque el campo no se haya tocado. */
  private readonly intentoEnviar = signal(false);
  readonly enlaceEnviado = signal<string | null>(null);

  idDe(campo: CampoMatricula): string {
    return PREFIJO_ID + campo;
  }

  errorDe(campo: CampoMatricula): string | null {
    const control = this.formulario.controls[campo];
    if (!control.errors || !(control.touched || this.intentoEnviar())) return null;

    const tipoDeError = Object.keys(control.errors)[0];
    return MENSAJES_DE_ERROR[campo][tipoDeError] ?? MENSAJE_DE_ERROR_GENERICO;
  }

  /** Quita lo que no sea dígito mientras se escribe el DNI o el celular. */
  dejarSoloDigitos(campo: 'dni' | 'celular'): void {
    const control = this.formulario.controls[campo];
    const soloDigitos = control.value.replace(/\D/g, '');
    if (soloDigitos !== control.value) control.setValue(soloDigitos);
  }

  enviar(): void {
    this.intentoEnviar.set(true);

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.enfocarPrimerError();
      return;
    }

    const datos = this.formulario.getRawValue();
    const enlace = whatsappUrl(construirMensajeMatricula({ ...datos, edad: this.edad() }));
    this.enlaceEnviado.set(enlace);
    window.open(enlace, '_blank', 'noopener');
  }

  volverAlFormulario(): void {
    this.enlaceEnviado.set(null);
  }

  private enfocarPrimerError(): void {
    const primerCampoConError = ORDEN_DE_CAMPOS.find((campo) => this.formulario.controls[campo].invalid);
    if (!primerCampoConError) return;
    this.anfitrion.querySelector<HTMLElement>(`#${this.idDe(primerCampoConError)}`)?.focus();
  }
}
