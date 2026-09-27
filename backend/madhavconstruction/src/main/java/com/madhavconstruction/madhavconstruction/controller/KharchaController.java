package com.madhavconstruction.madhavconstruction.controller;
import com.madhavconstruction.madhavconstruction.model.KharchaModel;
import com.madhavconstruction.madhavconstruction.repository.KharchaRepository;
import com.madhavconstruction.madhavconstruction.service.KharchaService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/v2/api/kharcha")
public class KharchaController {

    public KharchaController(KharchaService service, KharchaRepository repository) {
        this.service = service;
        this.repository = repository;
    }
    private KharchaService service;
    private KharchaRepository repository;
    // ✅ Add record
    @PostMapping
    public ResponseEntity<KharchaModel> addKharcha(@RequestBody KharchaModel kharcha) {
        return ResponseEntity.ok(service.addKharcha(kharcha));
    }

    // ✅ Get all records
    @GetMapping
    public ResponseEntity<List<KharchaModel>> getAllKharcha() {
        return ResponseEntity.ok(service.getAllKharcha());
    }

    // ✅ Get total money
    @GetMapping("/total")
    public ResponseEntity<Integer> getTotalMoney() {
        return ResponseEntity.ok(service.getTotalMoney());
    }

    @GetMapping("/all")
    public Page<KharchaModel> getAllKharcha(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    )
        {
            Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "date"));
            return repository.findAll(pageable);
        }

    @GetMapping("/search")
    public Page<KharchaModel> getKharcha(
            @RequestParam String company,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return service.getKharcha(company, page, size);
    }


    @GetMapping("/totalCompanies")
    public long getTotalCompanies(@RequestParam(required = false) String company) {

        if (company != null && !company.isEmpty()) {
            return repository.countDistinctCompaniesByName(company)
                    .orElse(0L); // safe default
        }

        return repository.countDistinctCompanies()
                .orElse(0L); // safe default
    }


    @GetMapping("/download-pdf")
    public ResponseEntity<byte[]> downloadKharchaPdf() {
        List<KharchaModel> kharchas = service.getAllKharcha(); // fetch all data
        byte[] pdfBytes = service.generateKharchaPdf(kharchas);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=kharcha_report.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }

    // ✅ Update existing record
    @PutMapping("/{id}")
    public ResponseEntity<KharchaModel> updateKharcha(
            @PathVariable String id,
            @RequestBody KharchaModel updatedKharcha) {
        return ResponseEntity.ok(service.updateKharcha(id, updatedKharcha));
    }

    // ✅ Delete record
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteKharcha(@PathVariable String id) {
        service.deleteKharcha(id);
        return ResponseEntity.noContent().build();
    }

}
