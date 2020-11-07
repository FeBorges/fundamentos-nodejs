import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // Checar se o type é válido
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Não exisite este tipo de lançamento');
    }

    // Validar o valor da transaction e se o tipo dela for outcome e comparar o valor como total
    const { total } = this.transactionsRepository.getBalance();
    // validar o total
    if (type === 'outcome' && total < value) {
      throw new Error('Você não possui saldo suficiente');
    }
    // TODO
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
