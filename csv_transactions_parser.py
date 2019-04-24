# -*- coding: utf-8 -*-

import sys
import csv
import re
from datetime import datetime

ISSUER_PATTERS = [
    re.compile("TRANSACCION CONTACTLESS EN (.+)"),
    re.compile("BIZUM DE (.+) CONCEPTO .+"),
    re.compile("COMPRA INTERNET EN (.+)"),
    re.compile("COMPRA PAGO MÓVIL EN (.+)"),
    re.compile("ANULACION COMPRA PAGO MÓVIL EN (.+)"),
    re.compile("ANUL COMPRA INTERNET EN (.+)"),
    re.compile("TRANSFERENCIA DE (.+), CONCEPTO .+"),
    re.compile("RECIBO (.+)"),
    re.compile("COMPRA EN (.+)"),
    re.compile("COMPRA (.+)"),
    re.compile("DEVOLUCION COMPRA INTERNET EN (.+)"),
    re.compile("DEVOLUCION COMPRA EN (.+)"),
    re.compile("BIZUM A FAVOR DE (.+) CONCEPTO .+"),
    re.compile("PAGO RECIBO DE (.+)")
]


def format_concept(concept):
    concept = re.sub(r', TARJ. :[0-9*]+', '', concept)
    concept = re.sub(r', TARJETA [0-9*]+', '', concept)
    concept = re.sub(r', COMISION [0-9]+,?[0-9]+', '', concept)
    concept = re.sub(r'Nº RECIBO .+', '', concept)
    concept = re.sub(r', REFERENCIA .+', '', concept)
    concept = re.sub(r', \.$', '', concept)
    return concept.rstrip()


def format_date(date_str):
    date = datetime.strptime(date_str, '%d/%m/%Y')
    return date.strftime("%Y-%m-%d")


def format_amount(amount):
    return amount.replace('.', '').replace(',', '.')


def format_issuer(concept):
    if concept.startswith("REINTEGRO") or concept.startswith("REINT."):
        return "CAJERO"

    for p in ISSUER_PATTERS:
        match_result = p.match(concept)
        if match_result:
            return match_result.group(1)

    if concept.startswith("TRANSFERENCIA A FAVOR DE") or concept.startswith("TRANSFERENCIA DE"):
        return "ME"
    if concept.startswith("LIQUIDACION DEL CONTRATO"):
        return "Santander"

    raise RuntimeError(concept)
    return concept


def parse_transaction(row, bank_id):
    concept = format_concept(row[1])
    return [concept, format_date(row[0]), format_amount(row[2]), format_issuer(concept), bank_id]


def parse_transactions(file_path, bank_id):
    transactions = []
    with open(file_path) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=';')
        for row in csv_reader:
            transactions.append(parse_transaction(row, bank_id))

    return transactions


def write_transactions(file_path, transactions):
    with open(file_path, mode='w') as csv_file:
        csv_writter = csv.writer(
            csv_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        for transaction in transactions:
            csv_writter.writerow(transaction)


def main(args):
    transactions = parse_transactions(args[0], args[2])
    write_transactions(args[1], transactions)


if __name__ == '__main__':
    main(sys.argv[1:])
