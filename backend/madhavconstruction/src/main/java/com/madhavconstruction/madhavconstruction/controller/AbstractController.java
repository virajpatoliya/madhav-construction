package com.madhavconstruction.madhavconstruction.controller;
import com.madhavconstruction.madhavconstruction.model.AbstractModel;
import com.madhavconstruction.madhavconstruction.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v2/api/abstract-bills")
public class AbstractController {


    public AbstractController(AbstractService billService) {
        this.billService = billService;
    }

    @Autowired
        private AbstractService billService;

        // Create
        @PostMapping
        public ResponseEntity<AbstractModel> createBill(@RequestBody AbstractModel bill) {
            AbstractModel saved = billService.create(bill);
            return ResponseEntity.ok(saved);
        }

        // Update
        @PutMapping("/{id}")
        public ResponseEntity<AbstractModel> updateBill(@PathVariable String id, @RequestBody AbstractModel bill) {
            AbstractModel updated = billService.update(id, bill);
            return ResponseEntity.ok(updated);
        }

        // Delete
        @DeleteMapping("/{id}")
        public ResponseEntity<?> deleteBill(@PathVariable String id) {
            billService.delete(id);
            return ResponseEntity.noContent().build();
        }

        // Get one
        @GetMapping("/{id}")
        public ResponseEntity<AbstractModel> getBill(@PathVariable String id) {
            AbstractModel b = billService.getById(id);
            if (b == null) return ResponseEntity.notFound().build();
            return ResponseEntity.ok(b);
        }

        // List (paged) - page 0-based
        @GetMapping
        public ResponseEntity<Page<AbstractModel>> listBills(@RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "10") int size) {
            Page<AbstractModel> p = billService.listAll(page, size);
            return ResponseEntity.ok(p);
        }
    @GetMapping("/search")
    public ResponseEntity<Page<AbstractModel>> search(
            @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(billService.search(q, page, size));
    }
    }

