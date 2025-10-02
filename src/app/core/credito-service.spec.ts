import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CreditoService } from './credito-service';
import { Credito } from './credito';
import { environment } from '../../environments/environment';

describe('CreditoService', () => {
  let service: CreditoService;
  let httpMock: HttpTestingController;

  const mockCredito: Credito = {
    numeroCredito: '123456',
    numeroNfse: '7891011',
    dataConstituicao: '2024-02-25',
    valorIssqn: 1500.75,
    tipoCredito: 'ISSQN',
    simplesNacional: 'Sim',
    aliquota: 5.0,
    valorFaturado: 30000.00,
    valorDeducao: 5000.00,
    baseCalculo: 25000.00
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CreditoService]
    });
    service = TestBed.inject(CreditoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve buscar créditos por NFS-e', () => {
    const numeroNfse = '7891011';
    const mockCreditos: Credito[] = [mockCredito];

    service.buscarPorNumeroNfse(numeroNfse).subscribe(creditos => {
      expect(creditos).toEqual(mockCreditos);
      expect(creditos.length).toBe(1);
      expect(creditos[0].numeroNfse).toBe(numeroNfse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/creditos/${numeroNfse}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCreditos);
  });

  it('deve buscar crédito por número do crédito', () => {
    const numeroCredito = '123456';

    service.buscarPorNumeroCredito(numeroCredito).subscribe(credito => {
      expect(credito).toEqual(mockCredito);
      expect(credito.numeroCredito).toBe(numeroCredito);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/creditos/credito/${numeroCredito}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCredito);
  });

  it('deve tratar erro ao buscar por NFS-e', () => {
    const numeroNfse = 'invalido';
    const errorMessage = 'NFS-e não encontrada';

    service.buscarPorNumeroNfse(numeroNfse).subscribe(
      () => fail('deveria ter falhado'),
      (error) => {
        expect(error.status).toBe(404);
        expect(error.error).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne(`${environment.apiUrl}/creditos/${numeroNfse}`);
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('deve tratar erro 404 ao buscar por número do crédito', () => {
    const numeroCredito = 'invalido';
    const errorMessage = 'Crédito não encontrado';

    service.buscarPorNumeroCredito(numeroCredito).subscribe(
      () => fail('deveria ter falhado'),
      (error) => {
        expect(error.status).toBe(404);
        expect(error.error).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne(`${environment.apiUrl}/creditos/credito/${numeroCredito}`);
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
