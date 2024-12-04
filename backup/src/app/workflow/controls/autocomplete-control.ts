import { ClassicPreset } from 'rete';

/**
 * Classe genérica para um controle de autocompletar.
 * @template T Tipo dos valores manipulados pelo controle.
 */
export class GenericAutocompleteControl<T = string> extends ClassicPreset.Control {
  private value: T; // Valor atual gerenciado pelo controle
  private options: T[]; // Opções disponíveis para autocompletar
  private onChange?: (value: T) => void; // Callback para mudanças

  /**
   * Cria uma instância de GenericAutocompleteControl.
   * @param key - Chave única do controle.
   * @param options - Lista de opções para autocompletar.
   * @param initial - Valor inicial selecionado.
   * @param onChange - Função opcional de callback para lidar com mudanças de valor.
   */
  constructor(
    key: string,
    options: T[],
    initial: T,
    onChange?: (value: T) => void
  ) {
    super();
    this.value = initial;
    this.options = options;
    this.onChange = onChange;
  }

  // Obtém o valor atual
  getValue(): T {
    return this.value;
  }

  // Define um novo valor e aciona o callback de mudança
  setValue(value: T): void {
    this.value = value;
    if (this.onChange) {
      this.onChange(value);
    }
  }

  // Método vazio para não renderizar diretamente no DOM
  render(container: HTMLElement): void {
    // A interface será gerenciada por outro mecanismo (por exemplo, Angular Component)
  }
}
