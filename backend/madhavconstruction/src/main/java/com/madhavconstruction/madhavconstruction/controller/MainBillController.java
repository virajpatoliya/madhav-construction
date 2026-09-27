package com.madhavconstruction.madhavconstruction.controller;
import com.madhavconstruction.madhavconstruction.model.MainBill;
import com.madhavconstruction.madhavconstruction.service.MainBillService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("v2/api/main-bills")
public class MainBillController {

    private final MainBillService service;

    public MainBillController(MainBillService service) {
        this.service = service;
    }

    @GetMapping
    public Page<MainBill> getAll(@RequestParam(defaultValue = "0") int page,
                                 @RequestParam(defaultValue = "10") int size) {
        return service.getAll(page, size);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MainBill> getById(@PathVariable String id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<MainBill> create(@RequestBody MainBill bill) {
        MainBill created = service.create(bill);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MainBill> update(@PathVariable String id, @RequestBody MainBill bill) {
        MainBill updated = service.update(id, bill);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public Page<MainBill> search(@RequestParam(required = false) String keyword,
                                 @RequestParam(defaultValue = "0") int page,
                                 @RequestParam(defaultValue = "10") int size) {
        return service.search(keyword, page, size);
    }
}

