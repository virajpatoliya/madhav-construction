package com.madhavconstruction.madhavconstruction.controller;

import com.madhavconstruction.madhavconstruction.model.KharchaModel;
import com.madhavconstruction.madhavconstruction.model.MaterialModel;
import com.madhavconstruction.madhavconstruction.repository.MaterialRepository;
import com.madhavconstruction.madhavconstruction.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
    @RequestMapping("/v2/api/material")
    public class MaterialController {

    public MaterialController(MaterialService service, MaterialRepository repository) {
        this.service = service;
        this.repository = repository;
    }

    private MaterialService service;


    private MaterialRepository repository;
    // ✅ Add record
    @PostMapping
    public ResponseEntity<MaterialModel> addMaterial(@RequestBody MaterialModel material) {
        return ResponseEntity.ok(service.addMaterial(material));
    }

    // ✅ Get all records
    @GetMapping
    public ResponseEntity<List<MaterialModel>> getAllMaterial() {
        return ResponseEntity.ok(service.getAllMaterial());
    }

    // ✅ Get total money
    @GetMapping("/total")
    public ResponseEntity<Integer> getTotalMoney() {
        return ResponseEntity.ok(service.getTotalMoney());
    }

    @GetMapping("/all")
    public Page<MaterialModel> getAllMaterial(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    )
    {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "date"));
        return repository.findAll(pageable);
    }

    @GetMapping("/search")
    public Page<MaterialModel> getMaterial(
            @RequestParam String company,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return service.getMaterial(company, page, size);
    }


    @GetMapping("/totalCompanies")
    public long getTotalCompanies(@RequestParam(required = false) String company) {
        Long count;

        if (company != null && !company.isEmpty()) {
            count = repository.countDistinctCompaniesByName(company);
        } else {
            count = repository.countDistinctCompanies();
        }

        // ✅ Prevent NullPointerException
        return (count != null) ? count : 0L;
    }


    // ✅ Update existing record
    @PutMapping("/{id}")
    public ResponseEntity<MaterialModel> updateMaterial(
            @PathVariable String id,
            @RequestBody MaterialModel updateMaterial) {
        return ResponseEntity.ok(service.updateMaterial(id, updateMaterial));
    }

    // ✅ Delete record
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaterial(@PathVariable String id) {
        service.deleteMaterial(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/download-pdf")
    public ResponseEntity<byte[]> downloadKharchaPdf() {
        List<MaterialModel> material = service.getAllMaterial(); // fetch all data
        byte[] pdfBytes = service.generateMaterialPdf(material);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=kharcha_report.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }
}