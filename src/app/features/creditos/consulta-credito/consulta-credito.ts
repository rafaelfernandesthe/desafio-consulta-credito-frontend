import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CreditoService } from '../../../core/credito-service';
import { Credito } from '../../../core/credito';

@Component({
  selector: 'app-consulta-credito',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './consulta-credito.html',
  styleUrl: './consulta-credito.css'
})
export class ConsultaCredito {
  private readonly fb = inject(FormBuilder);
  private readonly creditoService = inject(CreditoService);
  private readonly snackBar = inject(MatSnackBar);
  protected readonly TP_BUSCA_NFSE = 'nfse';

  // Signals para gerenciamento de estado reativo
  creditos = signal<Credito[]>([]);
  loading = signal(false);

  consultaForm: FormGroup;

  displayedColumns: string[] = [
    'numeroCredito',
    'numeroNfse',
    'dataConstituicao',
    'valorIssqn',
    'tipoCredito',
    'simplesNacional',
    'aliquota',
    'valorFaturado',
    'valorDeducao',
    'baseCalculo'
  ];

  constructor() {
    this.consultaForm = this.fb.group({
      tipoBusca: [this.TP_BUSCA_NFSE, Validators.required],
      numeroConsulta: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  consultar(): void {
    if (this.consultaForm.invalid) {
      this.mostrarMensagem('Por favor, preencha todos os campos corretamente.');
      return;
    }

    this.loading.set(true);
    this.creditos.set([]);

    const tipoBusca = this.consultaForm.value.tipoBusca;
    const numeroConsulta = this.consultaForm.value.numeroConsulta.trim();

    if (tipoBusca === this.TP_BUSCA_NFSE) {
      this.creditoService.buscarPorNumeroNfse(numeroConsulta).subscribe({
        next: (data) => {
          this.creditos.set(data);
          this.loading.set(false);
          if (data.length === 0) {
            this.mostrarMensagem('Nenhum crédito encontrado para esta NFS-e.');
          }
        },
        error: (error) => {
          this.creditos.set([]);
          this.loading.set(false);
          this.mostrarMensagem('Erro ao buscar créditos. Verifique o número da NFS-e.');
          console.error('Erro:', error);
        }
      });
    } else {
      this.creditoService.buscarPorNumeroCredito(numeroConsulta).subscribe({
        next: (data) => {
          this.creditos.set([data]);
          this.loading.set(false);
        },
        error: (error) => {
          this.creditos.set([]);
          this.loading.set(false);
          if (error.status === 404) {
            this.mostrarMensagem(error.error.message);
          } else {
            this.mostrarMensagem('Erro ao buscar crédito. Verifique o número do crédito.');
          }
          console.error('Erro:', error);
        }
      });
    }
  }

  limpar(): void {
    this.consultaForm.reset({ tipoBusca: this.TP_BUSCA_NFSE });
    this.creditos.set([]);
  }

  private mostrarMensagem(mensagem: string): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  formatarData(data: string): string {
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  formatarPorcentagem(valor: number): string {
    return `${valor.toFixed(2)}%`;
  }

}
