package com.madhavconstruction.madhavconstruction.controller;

import com.madhavconstruction.madhavconstruction.dto.LabourDTO;
import com.madhavconstruction.madhavconstruction.model.LabourModel;
import com.madhavconstruction.madhavconstruction.model.WorkData;
import com.madhavconstruction.madhavconstruction.service.AuthService;
import com.madhavconstruction.madhavconstruction.service.LabourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/v2/api/labour")
public class LabourController {
    public LabourController(AuthService authService, LabourService labourService) {
        this.authService = authService;
        this.labourService = labourService;
    }

    @Autowired
    private AuthService authService;

    @Autowired
    private LabourService labourService;

    // ✅ Insert Labour
    @PostMapping
    public ResponseEntity<?> addLabour(
            @RequestBody LabourModel labour,
            @CookieValue(value = "SESSIONID", required = false) String token
    ) {
        if (authService.getUserByToken(token).isEmpty()) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        LabourModel saved = labourService.saveLabour(labour);
        return ResponseEntity.ok(saved);
    }

    // ✅ Fetch All Labours
    @GetMapping
    public ResponseEntity<?> getAllLabours(
            @CookieValue(value = "SESSIONID", required = false) String token
    ) {
        if (authService.getUserByToken(token).isEmpty()) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        // Convert each LabourModel into LabourDTO
        List<LabourDTO> dtos = labourService.getAllLabours().stream()
                .map(labourService::getLabourProfile) // <-- converts to DTO with borrow + unpaid
                .toList();

        return ResponseEntity.ok(dtos);
    }


    // ✅ Fetch One Labour (by slug + publicId)
    @GetMapping("/{slug}-{publicId}")
    public ResponseEntity<?> getLabourBySlugAndPublicId(
            @PathVariable String slug,
            @PathVariable String publicId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @CookieValue(value = "SESSIONID", required = false) String token
    ) {
        if (authService.getUserByToken(token).isEmpty()) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        return labourService.getLabourBySlugAndPublicId(slug, publicId)
                .map(labour -> ResponseEntity.ok(
                        labourService.getLabourProfile(labour, page, size)
                ))
                .orElse(ResponseEntity.notFound().build());
    }



    @PostMapping("/{slug}-{publicId}/work")
    public ResponseEntity<?> addWork(
            @PathVariable String slug,
            @PathVariable String publicId,
            @RequestBody WorkData workData,
            @CookieValue(value = "SESSIONID", required = false) String token
    ) {
        if (authService.getUserByToken(token).isEmpty()) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        return labourService.addWorkToLabour(slug, publicId, workData)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{slug}-{publicId}")
    public ResponseEntity<?> deleteLabour(
            @PathVariable String slug,
            @PathVariable String publicId,
            @CookieValue(value = "SESSIONID", required = false) String token
    ) {
        if (authService.getUserByToken(token).isEmpty()) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        boolean deleted = labourService.deleteLabourBySlugAndPublicId(slug, publicId);

        if (deleted) {
            return ResponseEntity.ok("Labour deleted successfully");
        } else {
            return ResponseEntity.status(404).body("Labour not found");
        }
    }
    
    @GetMapping("/search")
    public List<LabourModel> searchLabours(@RequestParam String q) {
        return labourService.searchLabours(q);
    }

    @GetMapping("/{slug}/{publicId}/download-pdf")
    public ResponseEntity<byte[]> downloadLabourWorkPdf(
            @PathVariable String slug,
            @PathVariable String publicId) {

        Optional<LabourModel> labourOpt = labourService.getLabourBySlugAndPublicId(slug, publicId);

        if (labourOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        LabourModel labour = labourOpt.get();

        // Fetch DTO for salary, borrow, unpaid, etc.
        LabourDTO dto = labourService.getLabourProfile(labour);

        // Generate PDF with both models
        byte[] pdfBytes = labourService.generateWorkEntriesPdf(labour, dto);

        // Sanitize + encode name
        String safeName = labour.getLabourName()
                .trim()
                .replaceAll("[^a-zA-Z0-9]", "_");
        String filename = safeName + "_work.pdf";

        String encodedFilename = URLEncoder.encode(filename, StandardCharsets.UTF_8);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        ContentDisposition.attachment()
                                .filename(encodedFilename)
                                .build()
                                .toString())
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }


    @PutMapping("/{slug}-{publicId}/work/{workId}")
    public ResponseEntity<?> editWorkData(
            @PathVariable String slug,
            @PathVariable String publicId,
            @PathVariable String workId,
            @RequestBody WorkData workData,
            @CookieValue(value = "SESSIONID", required = false) String token
    ) {
        if (authService.getUserByToken(token).isEmpty()) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        return labourService.updateWorkData(slug, publicId, workId, workData)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{slug}-{publicId}/work/{workId}")
    public ResponseEntity<?> deleteWork(
            @PathVariable String slug,
            @PathVariable String publicId,
            @PathVariable String workId) {
        try {
            labourService.deleteWork(slug, publicId, workId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete work");
        }
    }
}
