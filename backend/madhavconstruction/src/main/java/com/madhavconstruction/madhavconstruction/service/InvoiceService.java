package com.madhavconstruction.madhavconstruction.service;
import com.madhavconstruction.madhavconstruction.model.Invoice;
import com.madhavconstruction.madhavconstruction.repository.InvoiceRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@Service
public class InvoiceService {

    private final InvoiceRepository repository;

    public InvoiceService(InvoiceRepository repository) {
        this.repository = repository;
    }

    public Page<Invoice> getAllInvoices(int page, int size) {
        return repository.findAll(PageRequest.of(page, size));
    }

    public Invoice getInvoiceById(String id) {
        return repository.findById(id).orElse(null);
    }

    public Invoice createInvoice(Invoice invoice) {
        if (repository.existsByBillNo(invoice.getBillNo())) {
            throw new RuntimeException("Invoice with this Bill No already exists");
        }
        return repository.save(invoice);
    }

    public Invoice updateInvoice(String id, Invoice updatedInvoice) {
        return repository.findById(id)
                .map(existing -> {
                    updatedInvoice.setId(existing.getId());
                    return repository.save(updatedInvoice);
                })
                .orElseThrow(() -> new RuntimeException("Invoice not found"));
    }

    public void deleteInvoice(String id) {
        repository.deleteById(id);
    }

    public Page<Invoice> searchInvoices(String keyword, int page, int size) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return repository.findAll(PageRequest.of(page, size));
        }
        return repository.searchByKeyword(keyword.trim(), PageRequest.of(page, size));
    }
}
