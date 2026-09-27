package com.madhavconstruction.madhavconstruction.controller;
import com.madhavconstruction.madhavconstruction.model.Invoice;
import com.madhavconstruction.madhavconstruction.service.InvoiceService;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;


@RestController
@RequestMapping("v2/api/invoices")
public class InvoiceController {

    private final InvoiceService service;

    public InvoiceController(InvoiceService service) {
        this.service = service;
    }

    // ✅ Fetch all invoices (paginated)
    @GetMapping
    public Page<Invoice> getAllInvoices(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return service.getAllInvoices(page, size);
    }

    @GetMapping("/{id}")
    public Invoice getInvoice(@PathVariable String id) {
        return service.getInvoiceById(id);
    }

    @PostMapping
    public Invoice createInvoice(@RequestBody Invoice invoice) {
        return service.createInvoice(invoice);
    }

    @PutMapping("/{id}")
    public Invoice updateInvoice(@PathVariable String id, @RequestBody Invoice invoice) {
        return service.updateInvoice(id, invoice);
    }

    @DeleteMapping("/{id}")
    public void deleteInvoice(@PathVariable String id) {
        service.deleteInvoice(id);
    }

    // ✅ Paginated + Search endpoint
    @GetMapping("/search")
    public Page<Invoice> searchInvoices(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return service.searchInvoices(keyword, page, size);
    }
}


